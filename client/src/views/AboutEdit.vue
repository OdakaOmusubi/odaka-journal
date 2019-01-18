<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>プロフィールを編集する</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
                <div class="subheading">プロフィール写真</div>
                <image-uploader v-on:childToParent="updateCropImg" isProfile="true" isPost="false"
                  defaultImage="https://firebasestorage.googleapis.com/v0/b/odakajournal.appspot.com/o/nomatan_tyoutyo.JPG?alt=media&token=57c559a4-1b5d-4e82-b7c7-c1d945fab7b7"
                ></image-uploader>
               <v-text-field name="fullName" label="表示ユーザー名" id="fullName"
                             type="text" required v-model="fullName" counter="50"
                             :rules="fullNameRules" full-width single-line>
               </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="submit">設定</v-btn>
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
  name: 'AboutEdit',
  components: {
    ImageUploader
  },
  data() {
    const maxFullNameLength = 50;
    return {
      valid: false,
      imageUrl: '',
      imageMimeType: '',
      fullName: '',
      fullNameRules: [
        v => v.length > 0,
        v =>
          v.length <= maxFullNameLength ||
          `説明は最大 ${maxFullNameLength} 文字まで入力可能です`
      ]
    };
  },
  computed: mapState(['user']),
  methods: {
    updateCropImg(childData) {
      this.imageUrl = childData.imageUrl;
      this.imageMimeType = childData.imageMimeType;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('uploadImage', {
            type: 'profiles',
            imageUrl: this.imageUrl,
            imageMimeType: this.imageMimeType,
            description: this.fullName
          })
          .then(downloadUrl => {
            return this.$store.dispatch('updatePeople', {
              uid: this.user.uid,
              fullName: this.fullName,
              profileImageUrl: downloadUrl
            });
          })
          .then(() => {
            this.$router.push({ path: '/about' });
          })
          .catch(error => {
            throw new Error(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.profile-image {
  height: 5em;
  width: 5em;
  border-radius: 50%;
  border: 1px solid #d3d3d3;
}
</style>
