import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import Firebase from './firebase/index.js';
import md5 from 'md5';
import { querystring } from '@firebase/util';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    posts: []
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
    },
    setPosts(state, payload) {
      state.posts = payload;
    }
  },
  actions: {
    fetchPosts({ commit }) {
      console.log('store fetchPosts');
      const sevenDaysPeriodSec = 60 * 60 * 24 * 7;
      Firebase.firestore.collection('posts')
      .where('updated_at', '>=', (Date.now()/1000 - sevenDaysPeriodSec))
      .onSnapshot(querySnapshot => {
        let posts = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          posts.push(doc.data());
        });
        commit('setPosts', posts);
      });
    },
    upload({ state }, { file, fileName, description }) {
      const storageRef = Firebase.storage.ref();
      const uid = state.user.uid;
      const hash = md5(uid + Date.now().toString());
      const [x, extention] = fileName.split('.');
      const imageStorePath = `posts/${hash}/image.${extention}`;
      const fileRef = storageRef.child(imageStorePath);
      fileRef.put(file).then(() => {
        console.log('Uploaded a blob or file!');

        Firebase.firestore
          .collection('posts')
          .add({
            author: {
              people_ref: `people/${uid}`,
              uid: uid
            },
            image_url: imageStorePath,
            text: description,
            thumb_image_url: '',
            title: '',
            created_at: Date.now() / 1000,
            updated_at: Date.now() / 1000
          })
          .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
            router.push('/timeline');
          })
          .catch(function(error) {
            console.error('Error adding document: ', error);
          });
      });
    },
    onAuthStateChanged({ commit }) {
      Firebase.auth.onAuthStateChanged(user => {
        user = user ? user : {};
        commit('onAuthStateChanged', user);
        commit('setIsAuthenticated', user.uid ? true : false);
      });
    },
    async userLogin({}, { email, password }) {
      Firebase.auth.signInWithEmailAndPassword(email, password).catch(() => {
        router.push('/');
      });
    },
    userJoin({}, { email, password }) {
      Firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => {
          Firebase.firestore
            .collection('people')
            .doc(credential.user.uid)
            .set({
              created_at: Date.now() / 1000,
              updated_at: Date.now() / 1000
            })
            .then(function() {
              console.log('Document successfully written.');
              router.push('/about');
            })
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
        })
        .catch(() => {
          router.push('/');
        });
    },
    userSignOut() {
      Firebase.auth
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
