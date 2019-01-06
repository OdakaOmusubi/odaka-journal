<template>
  <v-container fluid fill-height class="home-hero">
    <v-layout justify-center align-center column pa-5>
      <div class="display-4 font-weight-black white--text text-xs-center">KANADE</div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped>
.home-hero {
  background: url('http://source.unsplash.com/0BhSKStVtdM');
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>