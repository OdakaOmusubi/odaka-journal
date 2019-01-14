<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>
              <router-link :to="item.to">
                {{item.title}}
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
      </router-link>
      <div v-if="isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat class="hidden-sm-and-down" to="/menu">Menu</v-btn>
      </div>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/sign-in">SIGN IN</v-btn>
        <v-btn color="brown lighten-3" to="/join">JOIN</v-btn>
      </div>
      <div v-else>
        <v-btn flat to="/about">PROFILE</v-btn>
        <v-btn outline color="white" @click="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: 'AppNavigation',
  data() {
    return {
      appTitle: 'Kanade',
      drawer: false,
      items: [
        { title: 'Menu', to: '/timeline'},
        { title: 'Sign In', to: '/sign-in'},
        { title: 'Join', to: 'join' }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('userSignOut');
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
