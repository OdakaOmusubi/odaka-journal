
<template>

<div class="timeline">
  <vue-flux
     :options="fluxOptions"
     :images="fluxImages"
     :transitions="fluxTransitions"
     ref="slider">
        <flux-pagination slot="pagination"></flux-pagination>
  </vue-flux>

  <button @click="$refs.slider.showImage('next')">NEXT</button>
</div>

</template>

<script>

import { VueFlux, FluxPagination, Transitions } from 'vue-flux';

export default {
   components: {
      VueFlux,
      FluxPagination
   },

   data: () => ({
      fluxOptions: {
         autoplay: true
      },
      fluxImages: [ 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17112577/019da56077c8828d12f14c5dafca74ba/alt.jpg', 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17212109/368ac9c6a00e3c061c33e18aabeaefc4/alt.jpg', 'https://s3-ap-northeast-1.amazonaws.com/smartad-submission/out/17218844/4fc8df0291d2c4a14f3ccdb47e947bc3/alt.jpg' ],
      fluxTransitions: {
         transitionBook: Transitions.transitionBook
      }
   })
};
</script>
