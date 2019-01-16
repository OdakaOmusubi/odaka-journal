import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import Firebase from './firebase/index.js';
import md5 from 'md5';

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
        .where('updatedAt', '>=', Date.now() / 1000 - sevenDaysPeriodSec)
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
                peopleRef: `people/${uid}`,
                uid: uid
              },
              imageUrl: downloadUrl,
              text: description,
              profileImageUrl: '',
              title: '',
              createdAt: Date.now() / 1000,
              updatedAt: Date.now() / 1000
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
    async userLogin({}, { email, password }) {
      Firebase.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/timeline');
      })
      .catch((error) => {
        console.log(error);
        router.push('/sign-in');
      });
    },
    userJoin({}, { user, name, profileImageUrl }) {
      Firebase.firestore
        .collection('people')
        .doc(user.uid)
        .set({
          fullName: name,
          profileImageUrl: profileImageUrl,
          createdAt: Date.now() / 1000,
          updatedAt: Date.now() / 1000
        })
        .then(function() {
          console.log('Document successfully written.');
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
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
