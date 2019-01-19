
<template>
  <v-container fluid fill-height class="pa-0 timeline-bg">
    <v-layout row wrap class="content">
      <v-flex xs8>
        <v-carousel fluid height="100%" vertical="true">
          <v-carousel-item v-for="(item,i) in posts" :key="i" :src="item.imageUrl"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex xs4>
  
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
.content {
  position: relative;
  z-index: 9;
}
.timeline-bg {
  background: url('https://storage.googleapis.com/odakajournal.appspot.com/splash_comp.jpg');
  background-size: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
}
.timeline-bg:before{
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
  z-index: -1;
}
.timeline-bg:after{
  content: '';
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>