import creds from '../.credentials/api-client-secret.json';

const bodyBase = `client_id=${creds.web.client_id}&client_secret=${creds.web.client_secret}`;
const tokenUri = 'https://www.googleapis.com/oauth2/v4/token'

export default {
  getToken: (code) => {
    return fetch(tokenUri, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
      body: `${bodyBase}&grant_type=authorization_code&code=${code}&redirect_uri=${creds.web.javascript_origins[0]}`,
    })
    .then(r => r.json())
  },
  
  refreshToken: (token) => {
    return fetch(tokenUri, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
      body: `${bodyBase}&grant_type=refresh_token&refresh_token=${token}`,
    })
    .then(r => r.json())
  }
};