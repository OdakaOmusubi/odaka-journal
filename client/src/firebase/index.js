import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBZ6d-v6tp1v-gI0rn3gZdLnkltA98tjyU',
  authDomain: 'odakajournal.firebaseapp.com',
  databaseURL: 'https://odakajournal.firebaseio.com',
  projectId: 'odakajournal',
  storageBucket: 'odakajournal.appspot.com',
  messagingSenderId: '484912358238'
};

firebase.initializeApp(config);
// set login status persistence to LOCAL. Session does not expire until logout.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const auth = firebase.auth();
const storage = firebase.storage();
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default {
  auth,
  firestore,
  storage
};
