<template>
  <v-container fluid fill-height class="home-hero">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>新規登録情報</v-toolbar-title>
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
            <v-btn color="primary" :disabled="!valid" @click="submit">登録</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

export default {
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
  computed: mapState(['user']),
  watch: {
      getUser (auth) {
        if(!!auth){
          this.$router.push({ path: '/about'});
        }
      }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
          this.$auth.createUser(this.email, this.password)
          .then(userCredential => {
            this.$store.dispatch('userJoin', {
               user: userCredential.user,
               name: '',
               profileImageUrl: ''
            })
            .then(() => {
              if (this.user != null) {
                this.$router.push({ path: '/about' });
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.home-hero {
  background: url('https://storage.googleapis.com/odaka-journal/prod/splash_comp.jpg');
  background-size: cover;
}
</style>
