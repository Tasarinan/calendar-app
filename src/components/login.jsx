import React from 'react';
import moment from 'moment';
import qs from 'qs';
import {parse} from 'url';
import { GoogleLogin } from 'react-google-login';
import creds from '../.credentials/api-client-secret.json';
import auth from '../services/authentication';
import { GOOGLE_AUTHORIZATION_URL } from '../util/constants';

let remote;
let isDev = true;
if (window.require) {
  remote = window.require('electron').remote;
  isDev = window.require('electron-is-dev');
}

class Login extends React.Component {
  onSuccess = (res) => {
    if (res) {
      auth
        .getToken(res.code)
        .then(r => {
          this.props.action({
            token: r.access_token, 
            refreshToken: r.refresh_token,
            expiresAt: moment().add(r.expires_in, 'seconds').toJSON(),
          });
        })
        .catch(this.props.onError);
      return;
    }
    this.props.action();
  }

  renderLogout = () => (
    <div>
      <button onClick={() => this.onSuccess()}>
        Logout from Google
      </button>
    </div>
  )

  renderDevLogin = () => (
    <GoogleLogin
      clientId={creds.web.client_id}
      scope={'https://www.googleapis.com/auth/calendar'}
      onSuccess={this.onSuccess}
      onFailure={() => this.props.onError('Login failed')}
      className="button"
      prompt="consent"
      responseType="code"
    />
  )

  renderLogin = () => (
    <div><button onClick={() => { 
      signInWithPopup()
        .then(this.onSuccess)
        .catch(() => this.props.onError('Login failed'));
    }}>
      Login with Google
    </button></div>
  )

  render() {
    return this.props.logout ? this.renderLogout() : 
    isDev ? this.renderDevLogin() : this.renderLogin();
  }
}

const signInWithPopup = () => {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true,
    });

    const urlParams = {
      response_type: 'code',
      redirect_uri: 'http://localhost',
      client_id: creds.installed.client_id,
      scope: 'https://www.googleapis.com/auth/calendar',
      prompt: 'consent',
    }
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    function handleNavigation (url) {
      const query = parse(url, true).query
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`));
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed');
          setImmediate(() => authWindow.close());

          resolve(query);
        }
      }
    }

    authWindow.on('closed', () => {
      throw new Error('Auth window was closed by user');
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url)
    })

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleNavigation(newUrl)
    })

    authWindow.loadURL(authUrl);
  })
}

export default Login;