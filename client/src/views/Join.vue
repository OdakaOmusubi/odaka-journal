<template>
  <section>
    <b-field label="Email"
      type="is-danger"
      message="This email is invalid">
      <b-input type="email"
        v-model="email"
        value="john@"
        maxlength="30">
      </b-input>
    </b-field>

    <b-field label="Username"
      type="is-success"
      message="This username is available">
      <b-input value="johnsilver" maxlength="30"></b-input>
    </b-field>

    <b-field label="Password">
      <b-input type="password"
        value="iwantmytreasure"
        password-reveal>
      </b-input>
    </b-field>

  </section>
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