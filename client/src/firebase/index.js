import firebase from 'firebase/app';
import "firebase/auth";

const config = {
apiKey: "AIzaSyBZ6d-v6tp1v-gI0rn3gZdLnkltA98tjyU",
authDomain: "odakajournal.firebaseapp.com",
databaseURL: "https://odakajournal.firebaseio.com",
projectId: "odakajournal",
storageBucket: "odakajournal.appspot.com",
messagingSenderId: "484912358238"
};

export default {
    // init should be called in main.js
    init() {
        console.log('Firebase init()');
        firebase.initializeApp(config);
        // set login status persistence to LOCAL. Session does not expire until logout.
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
}
