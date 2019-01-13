import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from '@/store.js';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('./views/TimeLine.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('./views/Upload.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('./views/Menu.vue')
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('./views/Join.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        authRequired: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: '/sign-in'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
