import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import Firebase from './firebase/index.js';
import '@/firebase/';
// TODO at dev, currently PWA is disabled.
// import './registerServiceWorker'

Vue.config.productionTip = false;

Firebase.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
