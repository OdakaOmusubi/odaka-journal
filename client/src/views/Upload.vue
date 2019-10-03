<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>写真を投稿する</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <image-uploader
                v-on:childToParent="updateCropImg"
                :isProfile="false"
                :isPost="true"
                ref="cropper"
              ></image-uploader>
              <v-textarea
                name="description"
                label="説明を書く"
                id="description"
                type="text"
                required
                v-model="description"
                counter="80"
                :rules="descriptionRules"
                full-width
                height="5em"
                single-line
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" outline to="/timeline">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-progress-circular v-show="inProgress" indeterminate color="grey" class="mr-2"></v-progress-circular>
            <v-btn color="primary" :disabled="!valid" @click="submit">投稿</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUploader from '@/components/ImageUploader.vue';
import { mapState } from 'vuex';

export default {
  name: 'upload',
  components: {
    ImageUploader
  },
  data() {
    const maxDescriptionLength = 200;
    return {
      valid: false,
      imageUrl: '',
      imageMimeType: '',
      description: '',
      inProgress: false,
      descriptionRules: [
        v => v.length > 0,
        v =>
          v.length <= maxDescriptionLength ||
          `説明は最大 ${maxDescriptionLength} 文字まで入力可能です`
      ]
    };
  },
  computed: mapState(['user', 'people']),
  methods: {
    updateCropImg(childData) {
      this.imageUrl = childData.imageUrl;
      this.imageMimeType = childData.imageMimeType;
    },
    submit() {
      var childData = this.$refs.cropper.cropImage();
      this.imageUrl = childData.imageUrl;
      this.imageMimeType = childData.imageMimeType;
      if (this.$refs.form.validate()) {
        // start progress circle.
        this.inProgress = true;

        this.$store
          .dispatch('uploadImage', {
            bucketType: 'posts',
            imageUrl: this.imageUrl,
            imageMimeType: this.imageMimeType,
            fileName: this.imageName,
            description: this.description
          })
          .then(imageDownloadUrl => {
            return this.$store.dispatch('storePost', {
              uid: this.user.uid,
              imageDownloadUrl: imageDownloadUrl,
              description: this.description,
              profileImageUrl: this.people.profileImageUrl,
              fullName: this.people.fullName
            });
          })
          .then(() => {
            this.$router.push({ path: '/timeline' });
          });
      }
    }
  }
};
</script>
