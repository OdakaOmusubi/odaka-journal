import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/firebase/';
// TODO at dev, currently PWA is disabled.
import './registerServiceWorker';
import moment from 'moment-timezone';


Vue.prototype.moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
