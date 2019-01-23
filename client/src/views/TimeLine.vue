
<template>
  <v-container fluid fill-height class="pa-0 timeline-bg">
    <v-layout row wrap class="content" align-center>
      <v-flex xs12 lg7 class="pa-5">
        <v-responsive :aspect-ratio="1/1" app>
          <v-carousel fluid height="auto" hide-delimiters>
            <v-carousel-item v-for="(item,i) in posts" :key="i" :src="item.imageUrl" class="carouselItems">
  
              <v-bottom-nav :value="true" absolute color="rgba(0,0,0,.7)">
                <p class="white--text">
                  <v-avatar size="56" color="grey lighten-4" absolute top left>
                  <img :src="item.author.profileImageUrl" alt="">
                </v-avatar>
                <span class="display-1"> {{item.author.fullName}}</span>
                <span> {{item.text}}</span>
                </p>
              </v-bottom-nav>
            </v-carousel-item>
          </v-carousel>
        </v-responsive>
  
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
      // console.log('timeline created');
      this.$store.dispatch('fetchPosts');
    },
    mounted() {
      document.title = "タイムライン - " + document.title ;
    },
    beforeDestroy() {
      // console.log('timeline before destroy');
      this.offPostsListener();
    },
    methods: {}
  };
</script>

<style>
  .carouselItems::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  .v-responsive.v-carousel__item {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>