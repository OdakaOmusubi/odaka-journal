
<template>
  <v-container fluid fill-height class="pa-0 timeline-bg">
    <v-layout row wrap class="content">
      <v-flex xs12 lg8>
        <v-carousel fluid height="auto" >
          <v-carousel-item v-for="(item,i) in posts" :key="i" :src="item.imageUrl"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs12 lg4>
  
      </v-flex>
  
      <v-flex>
        <v-footer absolute>
          <!-- <v-btn justify-end color="success" to="/upload">Post</v-btn> -->
          <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              to="/upload"
            >
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