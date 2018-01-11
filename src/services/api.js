import { formatTask } from '../util/mappings';

let instance = null;

class Api {
  constructor(token) {
    this.token = token.token;
    this.calendarId = '3gp6uljioccr1j99hdvdkqoed4@group.calendar.google.com';
  }

  getTasks = () => {
    return callApi(
      `calendars/${this.calendarId}/events`,
      this.token,
      { method: 'GET' }
    )
    .then(toJson)
    .then(res => {
      if (!res) return null;
      return res.items.map(formatTask);
    });
  }
}

const toJson = (res) => res.status === 200 ? res.json() : null;

const callApi = (url, token, init) => {
  const headers = new Headers({
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return fetch(`https://www.googleapis.com/calendar/v3/${url}`, {
    ...init,
    headers,
  });
}

export const createApi = (token) => {
  instance = new Api(token);
};

export const deleteApi = () => {
  instance = null;
};

export default () => instance;