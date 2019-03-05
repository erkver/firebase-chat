import React, { Component } from 'react';
import './Login.scss';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Username from '../Username/Username';
import firebase from '../../firebase';

class Login extends Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      return <Username />;
    });
  };
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log(authResult, redirectUrl);
        if (authResult.additionalUserInfo.isNewUser === true) {
          return true;
        }
        return <Username />;
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'http://localhost:3000/username',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  render() {
    return (
      <div className="login-cont">
        <p>Login via Firebase Auth</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default Login;
