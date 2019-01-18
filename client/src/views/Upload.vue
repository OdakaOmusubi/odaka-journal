<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>写真を投稿する</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
                <image-uploader v-on:childToParent="updateCropImg" isProfile="false" isPost="true"></image-uploader>
               <v-textarea name="description" label="説明を書く" id="description"
                             type="text" required v-model="description" counter="200"
                             :rules="descriptionRules" full-width height="10em" single-line>
               </v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="submit">投稿</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUploader from '@/components/ImageUploader.vue';

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
      descriptionRules: [
        v => v.length > 0,
        v =>
          v.length <= maxDescriptionLength ||
          `説明は最大 ${maxDescriptionLength} 文字まで入力可能です`
      ]
    };
  },
  methods: {
      updateCropImg(childData) {
          this.imageUrl = childData.imageUrl;
          this.imageMimeType = childData.imageMimeType;
      },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('upload', {
            imageUrl: this.imageUrl,
            imageMimeType: this.imageMimeType,
            fileName: this.imageName,
            description: this.description
          })
          .then(() => {
            this.$router.push({ path: '/timeline' });
          });
      }
    }
  }
};
</script>
