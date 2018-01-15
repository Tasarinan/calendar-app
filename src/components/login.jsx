import React from 'react';
import moment from 'moment';
import { GoogleLogin } from 'react-google-login';
import creds from '../.credentials/api-client-secret.json';
import auth from '../services/authentication';

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

  render() {
    return this.props.logout ?
      (
        <div>
          <button onClick={() => this.onSuccess()}>
            Logout from Google
          </button>
        </div>
      ) :
      <GoogleLogin
        clientId={creds.web.client_id}
        scope={'https://www.googleapis.com/auth/calendar'}
        onSuccess={this.onSuccess}
        onFailure={() => this.props.onError('Login failed')}
        className="button"
        prompt="consent"
        responseType="code"
      />;
  }
}

export default Login;