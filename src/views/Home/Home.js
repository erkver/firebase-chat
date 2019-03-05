import React, { Component } from 'react';
import firebase from '../../firebase';

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
      .orderBy('timestamp', 'asc')
      .limit(100)
      .onSnapshot(snap => {
        console.log(snap.docs);
        let messages = [...this.state.messages];
        snap.forEach(doc => messages.push(doc.data()));
        this.setState({ messages });
      });
    firebase.auth().onAuthStateChanged(user => {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log(doc.data());
            this.setState({ user: doc.data() });
          }
        })
        .catch(err => console.log(err));
    });
  }

  componentWillUnmount() {
    const db = firebase.firestore();
    db.collection('messages').unsubscribe();
  }

  sendMessage = () => {
    const { user, input } = this.state;
    const db = firebase.firestore();
    console.log(user);
    db.collection('messages')
      .doc('global')
      .set({
        from: user.username,
        input,
        pic: user.pic,
        timestamp: new Date()
      })
      .then(() => this.setState({ input: '' }))
      .catch(err => console.log(err));
  };

  render() {
    const { input, messages } = this.state;
    let messagesList = messages.map((msg, i) => {
      return (
        <div key={i}>
          <img src={msg.pic} alt="" />
          <p className="username"> {msg.from}</p>
          <p className="username"> {msg.input}</p>
        </div>
      );
    });

    return (
      <div>
        <h1>Messages</h1>
        {messagesList}
        <div>
          <textarea
            value={input}
            onChange={e => this.setState({ input: e.target.value })}
            rows="3"
          />
          <button onClick={this.sendMessage}>Send Message</button>
        </div>
      </div>
    );
  }
}

export default Home;
