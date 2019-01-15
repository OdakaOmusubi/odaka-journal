
<template>
  <v-container fluid fill-height class="pa-0">
     <v-layout row wrap>
      <v-carousel fluid>
         <v-carousel-item
         v-for="(item,i) in posts"
         :key="i"
         :src="item.image_url"
         ></v-carousel-item>
      </v-carousel>
      <v-flex>
         <v-footer absolute>
            <v-btn justify-end color="success" to="/upload">Post</v-btn>
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
  computed: mapState(['posts']),
  created() {
     console.log('timeline created');
      this.$store.dispatch('fetchPosts');
  },
  methods: {
  }
};
</script>
