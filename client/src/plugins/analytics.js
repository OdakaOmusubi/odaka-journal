import Vue from 'vue';
import VueMultianalytics from 'vue-multianalytics'
import analyticsMixin from './analyticsMixin.js'

let mixpanelConfig = {
  token: '9fee5723f78e9e824eb3b846c580590b'
}

export default function initMultiAnalytics(router) {
  Vue.use(VueMultianalytics, {
    modules: {
      mixpanel: mixpanelConfig,
    },
    routing: {
        vueRouter: router,
        preferredProperty: 'path',
        ignoredViews: [],
        ignoredModules: ['ga', 'facebook', 'segment', 'mparticle']
    }
  }, analyticsMixin);
}
