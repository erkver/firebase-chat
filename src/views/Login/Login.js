import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Home from '../Home/Home';
import firebase from '../../firebase';

class Login extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/home');
      }
    });
  }

  uiConfig = {
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      if (authResult.additionalUserInfo.isNewUser === true) {
        return true;
      }
      return <Home />;
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'https://offtherecord-2a9df.firebaseapp.com/username',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
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
