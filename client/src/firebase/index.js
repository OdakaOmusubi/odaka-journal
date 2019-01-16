import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import store from '../store';

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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const auth = firebase.auth();
Vue.prototype.$auth = {
    createUser: async (username, pass) => {
        return auth.createUserWithEmailAndPassword(username, pass);
    },
    login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass);
    },
    logout: async () => {
        await auth.signOut();
    }
}
auth.onAuthStateChanged(user => {
    store.commit('updateUser', { user });
});

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
