import React, { Component } from 'react';
import firebase from '../../firebase';

class Username extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pic: ''
    };
  }

  uploadImage = async () => {
    let uploader = document.getElementById('uploader').files[0];
    let fileRef = firebase.storage().ref(`profile_pics/${uploader.name}`);
    await fileRef.put(uploader);
    await fileRef.getDownloadURL().then(url => {
      this.setState({ pic: url });
    });
  };

  createUser = () => {
    const { username, pic } = this.state;
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    db.collection('users')
      .doc(user.uid)
      .set({
        name: user.displayName,
        username,
        pic
      });
    this.props.history.push('/home');
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, pic } = this.state;
    return (
      <form className="username-content" onSubmit={this.createUser}>
        <h1>To complete signup:</h1>
        <div className="username-input-cont">
          <label>Create your own display name:</label>
          <input
            required
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </div>
        <div className="username-input-cont">
          <label>Upload custom avatar url:</label>
          <input
            type="text"
            className="avatar-url"
            required
            name="pic"
            value={pic}
            onChange={this.handleChange}
          />
        </div>
        <input type="file" id="uploader" onChange={e => this.uploadImage(e)} />
        <button disabled={username && pic === '' ? true : false}>
          Complete Sign up!
        </button>
      </form>
    );
  }
}

export default Username;
