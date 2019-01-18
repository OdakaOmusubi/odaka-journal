<template>
    <v-container>
        <v-layout justify-center>
            <v-flex fluid>
                <img :class="croppedImage" v-show="!showCropper" :src="cropImg" alt="Cropped Image" />
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <vue-cropper
                v-show="showCropper"
                ref='cropper'
                :guides="true"
                :view-mode="2"
                drag-mode="move"
                :auto-crop="true"
                :auto-crop-area="1.0"
                :aspect-ratio="1.0"
                :check-cross-origin="false"
                :background="true"
                :rotatable="true"
                :scalable="true"
                :src="imgSrc"
                alt="Source Image"
                :img-style="imageStyle">
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
  props: ["isProfile", "isPost", "defaultImage"],
  data() {
    return {
        imgSrc: '',
        imageMimeType: '',
        cropImg: '',
        showCropper: false,
        imageStyle: {}
    };
  },
  computed: {
      croppedImage: function() {
          if (this.isProfile) {
              console.log('isProfile', this.isProfile)
              return 'profile'
          } else if (this.isPost) {
              console.log('isPost', this.isPost)
              return 'post'
          } else {
              ''
          }
      }
  },
  mounted () {
      if (this.isProfile) {
        this.imageStyle = {}

      } else if (this.isPost) {
        this.imageStyle = {}
      }
      this.$refs.cropper.replace(this.defaultImage);
  },
  watch: {
      defaultImage: function(newVal, oldVal) {
          console.log('defaultImage update')
          this.imgSrc = newVal;
          this.$refs.cropper.replace(newVal);
      },
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
img {
    max-width: 100%;
}

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
