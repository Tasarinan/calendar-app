import { taskToLocal, taskToApi } from '../util/mappings';

let instance = null;

class Api {
  constructor(token) {
    this.token = token.token;
    this.calendarId = '3gp6uljioccr1j99hdvdkqoed4@group.calendar.google.com';
  }

  callApi = (url, init) => {
    const headers = new Headers({
      'content-type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return fetch(`https://www.googleapis.com/calendar/v3/${url}`, {
      ...init,
      headers,
    });
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
}

const toJson = (res) => res.status === 200 ? res.json() : null;

export const createApi = (token) => { instance = new Api(token); };

export const deleteApi = () => { instance = null; };

export default () => instance;