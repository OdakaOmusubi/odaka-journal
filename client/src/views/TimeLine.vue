
<template>
  <v-container fluid fill-height class="pa-0">
     <v-layout row wrap>
      <v-carousel fluid>
         <v-carousel-item
         v-for="(item,i) in items"
         :key="i"
         :src="item.src"
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
export default {
  name: 'timeline',
  data() {
    return {
      items: [
        {
          src: 'https://dummyimage.com/600x400/616161/ffffff'
        },
        {
          src: 'https://dummyimage.com/600x400/616161/ffffff'
        },
        {
          src: 'https://dummyimage.com/600x400/616161/ffffff'
        }
      ]
    };
  }
};
</script>
