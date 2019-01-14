import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import md5 from 'md5';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    upload({ state }, { file, fileName, description }) {
      const storageRef = firebase.storage().ref();
      const uid = state.user.uid;
      const hash = md5(uid + Date.now().toString());
      const [x, extention] = fileName.split('.');
      const imageStorePath = `posts/${hash}/image.${extention}`
      const fileRef = storageRef.child(imageStorePath);
      fileRef.put(file).then(() => {
        console.log('Uploaded a blob or file!');
        const db = firebase.firestore;
        const firestore = firebase.firestore();
        const settings = {
          timestampsInSnapshots: true
        };
        firestore.settings(settings);

        firestore.collection('posts').add({
          author: {
            people_ref: `people/${uid}`,
            uid: uid
          },
          image_url: imageStorePath,
          text: description,
          thumb_image_url: '',
          title: '',
          created_at: Date.now()/1000,
          updated_at: Date.now()/1000
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      });
    },
    onAuthStateChanged({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        commit('onAuthStateChanged', user);
        commit('setIsAuthenticated', user.uid ? true : false);
      });
    },
    async userLogin({}, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() => {
          router.push('/');
        });
    },
    userJoin({}, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/about');
        })
        .catch(() => {
          router.push('/');
        });
    },
    userSignOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/');
        })
        .catch(() => {
          router.push('/');
        });
    }
  }
});
