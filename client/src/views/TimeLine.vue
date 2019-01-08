
<template>
  <v-container fluid fill-height class="pa-0">
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>

export default {
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
    }
  }
};
</script>
