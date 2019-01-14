import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

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
    upload({ commit, state, getters }, {file, fileName, description}) {
      const storageRef = firebase.storage().ref();
      const uid = state.user.uid;
      const fileRef = storageRef.child(`posts/${uid}/${fileName}`)
      fileRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    },
    onAuthStateChanged({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
          user = user ? user : {};
          commit('onAuthStateChanged', user);
          commit('setIsAuthenticated', user.uid ? true : false);
      })
    },
    async userLogin({ commit }, { email, password }) {
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() => {
          router.push('/');
        });
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          router.push('/about');
        })
        .catch(() => {
          router.push('/');
        });
    },
    userSignOut({ commit }) {
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
