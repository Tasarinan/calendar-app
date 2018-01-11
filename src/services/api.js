import { formatTask } from '../util/format';

export default class Api {
  constructor(token) {
    this.token = token.token;
  }

  getTasks = () => {
    return callApi(
      'calendars/primary/events',
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

const toJson = (res) => res.status === 200 ? res.json() : {};

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