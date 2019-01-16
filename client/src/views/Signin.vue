<template>
  <v-container fluid fill-height class="home-hero">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>ログインしますか？</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
               <v-text-field prepend-icon="person" name="email" label="Eメール" type="email"
                             v-model="email" :rules="emailRules" required>
               </v-text-field>
               <v-text-field prepend-icon="lock" name="password" label="パスワード" id="password"
                             type="password" required v-model="password" :rules="passwordRules">
               </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click.prevent="submit">ログインする</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Signin',
  computed: {
    ...mapGetters(['getUser'])
  },
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be greater than 6 characters'
      ]
    };
  },
  watch: {
      getUser (auth) {
        if(!!auth){
          this.$router.push({ path: '/timeline'});
        }
      }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
          const auth = await this.$auth.login(this.email, this.password);
          if (auth.user != null) {
            this.$router.push({ path: '/timeline' });
          }
      }
    }
  }
};
</script>

<style scoped>
</style>

<style scoped>
.home-hero {
  background: url('https://storage.googleapis.com/odakajournal.appspot.com/splash_comp.jpg');
  background-size: cover;
}
</style>
