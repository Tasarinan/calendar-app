import creds from '../.credentials/api-client-secret.json';
import store from '../redux/store';
import { GOOGLE_TOKEN_URL } from '../util/constants';

let isDev = true;
if (window.require) {
  isDev = window.require('electron-is-dev');
}

const credsToUse = !isDev ? 
  { ...creds.installed, redirect_uri: 'http://localhost' } :
  { ...creds.web, redirect_uri: 'http://localhost:3000' };
const bodyBase = `client_id=${credsToUse.client_id}&client_secret=${credsToUse.client_secret}`;

export default {
  getToken: (code) => {
    return fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
      body: `${bodyBase}&grant_type=authorization_code&code=${code}&redirect_uri=${credsToUse.redirect_uri}`,
    })
    .then(catchErrors)
    .then(r => r.json())
  },
  
  refreshToken: (token) => {
    return fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
      body: `${bodyBase}&grant_type=refresh_token&refresh_token=${token}`,
    })
    .then(catchErrors)
    .then(r => r.json())
  }
};

const catchErrors = (res) => {
  if (res.status !== 200) {
    store.dispatch({
      type: 'SHOW_ERROR',
      error: `Google API error: ${res.statusText}`,
    });
  }
  return res;
}