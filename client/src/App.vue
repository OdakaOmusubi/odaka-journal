<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';

export default {
  name: 'App',
  components: {
    AppNavigation
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style>
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.application--wrap {
  background: url('https://storage.googleapis.com/odakajournal.appspot.com/splash_comp.jpg');
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
}
.application--wrap > * {
  position: relative;
  z-index: ;
}
.application--wrap:before{
  content: '';
  background: inherit;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -2;
}
.application--wrap:after{
  content: '';
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
