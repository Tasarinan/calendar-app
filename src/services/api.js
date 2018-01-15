import moment from 'moment';
import auth from './authentication';
import store from '../redux/store';
import { taskToLocal, taskToApi } from '../util/mappings';

let instance = null;

class Api {
  constructor(token, calendar) {
    this.setupToken(token);
    this.calendarId = calendar || 'primary';
  }

  setupToken = (token) => {
    this.token = token.token;
    this.expiresAt = token.expiresAt;
    this.refreshToken = token.refreshToken;
  }

  getNewToken = async () => {
    const r = await auth.refreshToken(this.refreshToken);
    const token = {
      token: r.access_token, 
      refreshToken: this.refreshToken,
      expiresAt: moment().add(r.expires_in, 'seconds').toJSON(),
    };

    this.setupToken(token);
    store.dispatch({ type: 'LOGIN', token });
  }

  callApi = (url, init) => {
    if (moment().utc().isAfter(this.expiresAt)) {
      this.getNewToken();
    }

    const headers = new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return fetch(`https://www.googleapis.com/calendar/v3/${url}`, {
      ...init,
      headers,
    })
    .then(catchErrors);
  }

  getTasks = () => {
    return this.callApi(
      `calendars/${this.calendarId}/events`,
      { method: 'GET' }
    )
    .then(toJson)
    .then(res => {
      if (!res) return null;
      return res.items.map(taskToLocal);
    });
  }

  updateTask = (task) => {
    return this.callApi(
      `calendars/${this.calendarId}/events/${task._id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(taskToApi(task))
      }
    );
  }

  createTask = (task, updateId) => {
    return this.callApi(
      `calendars/${this.calendarId}/events`,
      {
        method: 'POST',
        body: JSON.stringify(taskToApi(task, true))
      }
    )
    .then(toJson)
    .then(r => updateId(r.id));
  }

  deleteTask = (id) => {
    return this.callApi(
      `calendars/${this.calendarId}/events/${id}`,
      { method: 'DELETE' }
    );
  }

  getCalendars = () => {
    return this
      .callApi('users/me/calendarList', { method: 'GET' })
      .then(toJson)
      .then(res => {
        if (!res) {
          return [];
        }
        return res.items
          .filter(c => c.accessRole === 'owner')
          .map(c => c.primary ? { ...c, summary: 'Primary' } : c)
          .map(c => ({
            id: c.id,
            name: c.summary,
            description: c.description
          }));
      });
  }
}

const toJson = (res) => res.status === 200 ? res.json() : null;

const catchErrors = (res) => {
  if (res.status < 200 && res.status >= 300) {
    store.dispatch({
      type: 'SHOW_ERROR',
      error: `Google API error: ${res.statusText}`,
    });
  }
  return res;
}

export const createApi = (token, calendar) => { if (instance === null) instance = new Api(token, calendar); };

export const deleteApi = () => { instance = null; };

export default () => instance;