import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBQepnVXCgQ465z776VZlufZ_PIroQ3N3g',
  authDomain: 'offtherecord-2a9df.firebaseapp.com',
  databaseURL: 'https://offtherecord-2a9df.firebaseio.com',
  projectId: 'offtherecord-2a9df',
  storageBucket: 'offtherecord-2a9df.appspot.com',
  messagingSenderId: '369344354436'
};

firebase.initializeApp(config);

export default firebase;
