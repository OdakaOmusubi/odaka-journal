import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import initMultiAnalytics from './plugins/analytics';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/firebase/';
// TODO at dev, currently PWA is disabled.
import './registerServiceWorker';

Vue.config.productionTip = false;

initMultiAnalytics(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
