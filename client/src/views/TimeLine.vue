
<template>
  <v-container fill-height>
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
  data: () => ({
    items: [
      {
        src: 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17112577/019da56077c8828d12f14c5dafca74ba/alt.jpg'
      },
      {
        src: 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17112577/019da56077c8828d12f14c5dafca74ba/alt.jpg'
      },
      {
        src: 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17112577/019da56077c8828d12f14c5dafca74ba/alt.jpg'
      }
    ]
  })
};
</script>
