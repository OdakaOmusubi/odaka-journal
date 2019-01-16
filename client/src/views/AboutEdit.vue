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
                <v-img :src="imageUrl" class="profile-image" v-if="imageUrl" align-center justify-center contain/>
                <v-text-field label="写真を選ぶ" @click="pickFile" v-model="imageName" required prepend-icon="attach_file">
                </v-text-field>
                <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                >
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
export default {
  name: 'upload',
  data() {
    const maxFullNameLength = 50;
    return {
      valid: false,
      imageName: '',
      imageUrl: 'https://storage.googleapis.com/odakajournal.appspot.com/profiles/nomatan_tyoutyo.JPG',
      imageFile: '',
      fullName: '',
      fullNameRules: [
        v => v.length > 0,
        v =>
          v.length <= maxFullNameLength||
          `説明は最大 ${maxFullNameLength} 文字まで入力可能です`
      ]
    };
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
        this.imageUrl = '';
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        // this.$store.dispatch('upload', {
        //   file: this.imageFile,
        //   fileName: this.imageName,
        //   fullName: this.fullName
        // });
        this.$router.push({ path: '/timeline'});
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
    border: 1px solid #D3D3D3;
}
</style>