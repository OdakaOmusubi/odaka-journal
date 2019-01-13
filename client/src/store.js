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
      return state.user !== undefined && state.user !== null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        // set login status persistence to LOCAL. Session does not expire until logout.
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
          firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(credential => {
            commit('setUser', credential.user);
            commit('setIsAuthenticated', true);
            router.push('/timeline');
          })
          .catch(() => {
            commit('setUser', null);
            commit('setIsAuthenticated', false);
            router.push('/');
          });
        })
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          commit('setUser', credential.user);
          commit('setIsAuthenticated', true);
          router.push('/about');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    }
  }
});
