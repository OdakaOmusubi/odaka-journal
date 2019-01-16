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
    posts: [],
    offPostsListener: null
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    updateUser(state, { user }) {
      Vue.set(state, 'user', user);
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setOffPostsListener(state, payload) {
      state.offPostsListener = payload;
    }
  },
  actions: {
    fetchPosts({ commit }) {
      console.log('store fetchPosts');
      const sevenDaysPeriodSec = 60 * 60 * 24 * 7;
      const unsubscribeFunc = Firebase.firestore
        .collection('posts')
        .where('updated_at', '>=', Date.now() / 1000 - sevenDaysPeriodSec)
        .onSnapshot(querySnapshot => {
          let posts = [];
          querySnapshot.forEach(doc => {
            posts.push(doc.data());
          });
          commit('setPosts', posts);
        });
      commit('setOffPostsListener', unsubscribeFunc);
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
        fileRef.getDownloadURL().then(downloadUrl => {
          Firebase.firestore
            .collection('posts')
            .add({
              author: {
                people_ref: `people/${uid}`,
                uid: uid
              },
              image_url: downloadUrl,
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
      });
    },
    onAuthStateChanged({ commit }) {
      Firebase.auth.onAuthStateChanged(user => {
        user = user ? user : {};
        commit('onAuthStateChanged', user);
      });
    },
    async userLogin({ commit }, { email, password }) {
      Firebase.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        commit('setIsAuthenticated', true);
        router.push('/timeline');
      })
      .catch((error) => {
        console.log(error);
        router.push('/sign-in');
      });
    },
    userJoin({ commit }, { email, password }) {
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
              commit('setIsAuthenticated', true);
              router.push('/about');
            })
            .catch(function(error) {
              console.error('Error adding document: ', error);
            });
        })
        .catch(() => {
          router.push('/join');
        });

    },
    userSignOut() {
      Firebase.auth
        .signOut()
        .then(() => {
          router.push('/sign-in');
        })
        .catch(() => {
          router.push('/sign-in');
        });
    }
  }
});
