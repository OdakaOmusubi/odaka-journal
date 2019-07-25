
<template>
  <v-container fluid fill-height class="pa-0 timeline-bg">
    <v-layout row wrap class="content" align-center>
      <v-flex sm12 md7
      :class="{'pa-0': $vuetify.breakpoint.smAndDown, 'pa-5': $vuetify.breakpoint.mdAndUp}"
      >
        <v-responsive :aspect-ratio="1/1" app  class="elevation-12">
          <v-carousel fluid height="auto" hide-delimiters interval="10000">
            <v-carousel-item v-for="(item,i) in posts" :key="i" :src="item.imageUrl" class="carouselItems">
              <v-bottom-nav :value="true" absolute color="rgba(0,0,0,.7)">
                <div class="white--text pt-2">
                  <v-avatar class="carousel-author" size="56" color="grey lighten-4" absolute top left>
                    <img :src="item.author.profileImageUrl" alt="">
                  </v-avatar>
                  <span
                  :class="{'subheading': $vuetify.breakpoint.smAndDown, 'headline': $vuetify.breakpoint.mdAndUp}"
                  > {{item.author.fullName}}</span>
                  <span> {{item.text}}</span>
                </div>
              </v-bottom-nav>
            </v-carousel-item>
          </v-carousel>
        </v-responsive>
  
      </v-flex>
      <v-flex xs12 sm5>
        <v-container fill-height class="hidden-sm-and-down">
          <!-- pc,tablet -->
          <v-layout align-center>
            <v-flex class="text-md-center">
              <p class="display-2 white--text">{{ this.currentDateJST.format("YYYY.MM.DD (ddd)")}}</p>
              <p class=" white--text time-disp">{{ this.currentDateJST.format("HH:mm")}}</p>
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
import { mapState } from 'vuex';

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
  computed: mapState(['posts', 'offPostsListener', 'currentDateJST']),
  created() {
    // console.log('timeline created');
    this.$store.dispatch('fetchPosts');
  },
  mounted() {
    document.title = 'タイムライン - ' + document.title;
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
  content: '';
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
.carousel-author {
  top: -16px;
  left: 8px;
}
.time-disp {
  font-size: 140px;
}
</style>
