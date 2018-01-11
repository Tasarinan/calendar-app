import React from 'react';
import { GoogleLogin } from 'react-google-login';
import creds from '../.credentials/api-client-secret.json';

class Login extends React.Component {
  onSuccess = (res) => {
    if (res) {
      // console.log(res);
      this.props.action(res.profileObj, { token: res.accessToken });
      return;
    }
    this.props.action();
  }

  render() {
    return this.props.logout ?
      (
        <div>
          <button onClick={() => this.onSuccess()}>Logout</button>
          <span>&nbsp;&nbsp;(Logged in as: {this.props.email})</span>
        </div>
      ) :
      <GoogleLogin
        clientId={creds.web.client_id}
        scope={'https://www.googleapis.com/auth/calendar'}
        onSuccess={this.onSuccess}
        onFailure={() => null}
      />;
  }
}

export default Login;