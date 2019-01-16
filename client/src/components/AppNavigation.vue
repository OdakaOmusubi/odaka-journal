<template>
  <span>
    <v-navigation-drawer v-if=false app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
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
      <router-link to="/timeline">
        <v-toolbar-title to="/timeline">{{appTitle}}</v-toolbar-title>
      </router-link>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!user" class="hidden-sm-and-down">
        <v-btn flat to="/sign-in">ログイン</v-btn>
        <v-btn color="brown lighten-3" to="/join">新規登録</v-btn>
      </div>
      <div v-else>
        <v-btn flat to="/about">プロフィール</v-btn>
        <v-btn outline color="white" @click="logout">ログアウト</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppNavigation',
  data() {
    return {
      appTitle: 'KANADE',
      drawer: false,
      items: [
        { title: 'ホーム', to: '/timeline' },
        { title: 'ログイン', to: '/sign-in' },
        { title: '新規登録', to: 'join' }
      ]
    };
  },
  computed: mapState({
    user: state => state.user
  }),
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
