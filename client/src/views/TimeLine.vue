
<template>
  <v-container fluid fill-height class="pa-0 timeline-bg">
    <v-layout row wrap class="content">
      <v-flex xs12 lg7>
        <v-carousel fluid height="auto" hide-controls hide-delimiters app>
          <v-carousel-item v-for="(item,i) in posts" :key="i" :src="item.imageUrl"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 lg5>
        <v-container fill-height class="hidden-sm-and-down">
          <!-- pc,tablet -->
          <v-layout align-center>
            <v-flex class="text-md-center">
              <p class="display-2 white--text">2019.1.19 (Sat.)</p>
              <p class="display-4 white--text">10:00</p>
              <v-btn dark fab large color="pink" to="/upload">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          
        </v-container>
        <v-footer class="hidden-md-and-up" fixed color="transparent">
          <!-- smartphone -->
          <v-btn absolute dark fab top right color="pink" to="/upload">
            <v-icon>add</v-icon>
          </v-btn>
        </v-footer>
      </v-flex>
    </v-layout>
  
  </v-container>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  
  export default {
    name: 'timeline',
    data() {
      return {
        // items: [
        //   {
        //     image_url: 'https://dummyimage.com/600x400/616161/ffffff'
        //   },
        //   {
        //     image_url: 'https://dummyimage.com/600x400/616161/ffffff'
        //   },
        //   {
        //     image_url: 'https://dummyimage.com/600x400/616161/ffffff'
        //   }
        // ]
      };
    },
    computed: mapState(['posts', 'offPostsListener']),
    created() {
      console.log('timeline created');
      this.$store.dispatch('fetchPosts');
    },
    beforeDestroy() {
      console.log('timeline before destroy');
      this.offPostsListener();
    },
    methods: {}
  };
</script>

<style scoped>
  
</style>