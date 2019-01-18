<template>
    <v-container>
        <v-layout justify-center>
            <v-flex fluid>
                <img v-bind:class="{ profile: isProfile, post: isPost }" v-show="!showCropper" :src="cropImg" alt="Cropped Image" />
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <vue-cropper
                v-show="showCropper"
                ref='cropper'
                :guides="true"
                :view-mode="2"
                drag-mode="crop"
                :auto-crop-area="0.5"
                :min-container-width="250"
                :min-container-height="180"
                :background="true"
                :rotatable="true"
                :src="imgSrc"
                alt="Source Image"
                :img-style="{ 'width': '400px', 'height': '300px' }">
            </vue-cropper>
            <input type="file" name="image" accept="image/*" ref="image"
                style="display:none"
                @change="setImage" />
        </v-layout>
        <v-layout>
            <v-btn @click="pickFile">画像を選択</v-btn>
            <v-btn v-if="cropImg != ''" v-show="!showCropper" @click="editFile">画像を編集</v-btn>
            <v-btn v-if="showCropper" @click="cropImage">編集を終了する</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import VueCropper from 'vue-cropperjs';

export default {
  name: 'ImageUploader',
  components: {
      VueCropper
  },
  props: ["isProfile", "isPost"],
  data() {
    return {
        imgSrc: '',
        imageMimeType: '',
        cropImg: '',
        showCropper: false
    };
  },
  watch: {
      cropImg: function (newVal, oldVal) {
          this.$emit('childToParent', { imageUrl: newVal, imageMimeType: this.imageMimeType });
      }
  },
  // mounted() {
  //   this.$refs.croppieRef.bind({
  //       url: 'http://i.imgur.com/ecMUngU.jpg'
  //   });
  // },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    editFile() {
        console.log('editFile')
        this.showCropper = true;
    },
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes('image/')) {
        alert('Please select an image file');
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageMimeType = file.type;
          this.imgSrc = event.target.result;
          this.cropImg = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    cropImage() {
        console.log('cropImage')
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.showCropper = false;
    }
  }
};
</script>

<style>
.profile {
  height: 5em;
  width: 5em;
  border-radius: 50%;
  border: 1px solid #d3d3d3;
}

.post {
  height: 10em;
  width: 13em;
  border-radius: 1em;
  border: 1px solid #d3d3d3;
}
</style>
