import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store.js';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/sign-in'
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
      component: () => import('./views/Upload.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('./views/Menu.vue'),
      meta: {
        authRequired: true
      }
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import('./views/Signin.vue'),
      meta: {
        noAccessWithAuth: true
      }
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
  if (to.matched.length === 0 || to.matched.some(record => record.path === '/')) {
    // no matched access
    next({ path: '/sign-in' });
  }
  if (to.matched.some(record => record.meta.noAccessWithAuth)) {
    if (store.state.user) {
      console.log('guard noaccess')
      router.go(-1);
    }
  }
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
      console.log('not auth. go to sign-in')
      next({ path: '/sign-in' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
