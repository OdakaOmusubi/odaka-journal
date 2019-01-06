<template>
  <v-container fluid>
    <v-layout>
      <h1>Join Page</h1>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
          valid: false,
          email: '',
          password: '',
          userName: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          passwordRules: [
            v => !!v || 'Password is required',
            v =>
              v.length >= 6 ||
              'Password must be greater than 6 characters'
          ]
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('userJoin', {
            email: this.email,
            password: this.password
          });
        }

      }
    }
  }
</script>