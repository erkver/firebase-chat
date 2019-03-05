import React, { Component } from 'react';
import firebase from '../../firebase';
import './Home.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      messages: [],
      user: {}
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .onSnapshot(snap => {
        let messages = [];
        snap.forEach(doc => messages.push(doc.data()));
        this.setState({ messages });
      });

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push('/');
      }
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          this.setState({ user: doc.data() });
        });
    });
  }

  componentWillUnmount() {
    firebase
      .firestore()
      .collection('messages')
      .unsubscribe();
  }

  sendMessage = () => {
    const { user, input } = this.state;
    const db = firebase.firestore();
    db.collection('messages')
      .add({
        from: user.username,
        input,
        pic: user.pic,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => this.setState({ input: '' }));
  };

  enterMessage = e => {
    const { input } = this.state;
    if (e.keyCode === 13 && e.ctrlKey && input !== '') {
      this.sendMessage();
    }
  };

  render() {
    const { input, messages } = this.state;
    let messagesList = messages.map((msg, i) => {
      return (
        <div className="msg-card" key={i}>
          <div className="info-cont">
            <img src={msg.pic} alt="" />
            <p>{msg.from}</p>
          </div>
          <p className="input">{msg.input}</p>
        </div>
      );
    });

    return (
      <div className="home-cont">
        <h1>Messages</h1>
        <div className="msg-cont">{messagesList}</div>
        <div className="input-cont">
          <textarea
            value={input}
            onChange={e => this.setState({ input: e.target.value })}
            rows="3"
            maxLength="500"
            onKeyDown={this.enterMessage}
            placeholder="Press ctrl + enter or click button to send message"
          />
          <button
            disabled={input === '' ? true : false}
            onClick={this.sendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
