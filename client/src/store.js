import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import firebase from 'firebase/app';
import Firebase from './firebase/index.js';
import md5 from 'md5';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    people: null,
    posts: [],
    currentDateJST: moment().tz('Asia/Tokyo'),
    offPostsListener: null
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPeople(state) {
      return state.people
    }
  },
  mutations: {
    updateUser(state, { user }) {
      Vue.set(state, 'user', user);
    },
    setPeople(state, people) {
      Vue.set(state, 'people', people);
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    updateCurrentDateJST(state) {
      // use vue prototype moment, which initialized in main.js
      state.currentDateJST = moment().tz('Asia/Tokyo');
    },
    setOffPostsListener(state, payload) {
      state.offPostsListener = payload;
    }
  },
  actions: {
    startSchedules({ commit }) {
      setInterval(() => {
        commit('updateCurrentDateJST')
      }, 1000 * 10); // update every 10 sec.
    },
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
    async uploadImage({ state }, { bucketType, imageUrl, imageMimeType }) {
      const storageRef = Firebase.storage.ref();
      const uid = state.user.uid;
      const hash = md5(uid + Date.now().toString());
      let fileExtention = '';
      if (imageMimeType == 'image/jpeg') {
        fileExtention = 'jpg';
      } else if (imageMimeType == 'image/png') {
        fileExtention = 'png';
      } else {
        throw new Error(`imageMimeType ${imageMimeType} is invalid.`);
      }
      let bucket;
      if (bucketType === 'posts') {
        bucket = 'posts';
      } else if (bucketType === 'profiles') {
        bucket = 'profiles';
      } else {
        throw new Error(`unknown bucket type: ${bucketType}`);
      }
      const imageStorePath = `${bucket}/${hash}/image.${fileExtention}`;
      console.log(`try to upload file to ${imageStorePath}`);
      const fileRef = storageRef.child(imageStorePath);
      const metadata = { contentType: imageMimeType };
      const downloadUrl = await fileRef
        .putString(imageUrl, firebase.storage.StringFormat.DATA_URL, metadata)
        .then(snapshot => {
          console.log(snapshot.ref.imageUrl);
          console.log('Uploaded a blob or file!');
          return fileRef.getDownloadURL().then(downloadUrl => {
            return downloadUrl;
          });
        });
      console.log(`downloadUrl is ${downloadUrl}`);

      return downloadUrl;
    },
    async storePost(
      {},
      { uid, imageDownloadUrl, description, profileImageUrl, fullName }
    ) {
      Firebase.firestore
        .collection('posts')
        .add({
          author: {
            peopleRef: `people/${uid}`,
            profileImageUrl: profileImageUrl,
            fullName: fullName,
            uid: uid
          },
          imageUrl: imageDownloadUrl,
          text: description,
          title: '',
          createdAt: Date.now() / 1000,
          updatedAt: Date.now() / 1000
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    },
    async updatePeople({}, { uid, fullName, profileImageUrl }) {
      Firebase.firestore
        .collection('people')
        .doc(uid)
        .update({
          fullName: fullName,
          profileImageUrl: profileImageUrl,
          updatedAt: Date.now() / 1000
        })
        .then(function() {
          console.log('Document successfully written.');
        })
        .catch(function(error) {
          throw new Error('Error adding document: ', error);
        });
    },
    async userLogin({}, { email, password }) {
      Firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/timeline');
        })
        .catch(error => {
          console.log(error);
          router.push('/sign-in');
        });
    },
    async userJoin({}, { user, name, profileImageUrl }) {
      return Firebase.firestore
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
    async fetchPeople({ commit }, { uid }) {
      Firebase.firestore
      .collection('people')
      .doc(uid)
      .get()
      .then( doc => {
        console.log(`fetch people. data:${doc.data()}`);
        commit('setPeople', doc.data());
      })
      .catch((e) => {
        throw new Error(e);
      });
    },
    userSignOut({ commit }) {
      Firebase.auth
        .signOut()
        .then(() => {
          commit('setPeople', null);
          router.push('/sign-in');
        })
        .catch(() => {
          router.push('/sign-in');
        });
    }
  }
});
