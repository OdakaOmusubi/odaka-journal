<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>

    <home-footer></home-footer>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import HomeFooter from '@/components/Footer';

export default {
  name: 'App',
  components: {
    AppNavigation,
    HomeFooter
  },
  data () {
    return {
      //
    }
  }
}
</script>
