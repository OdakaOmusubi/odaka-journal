<template>
  <span>
    <!-- <v-navigation-drawer v-if=false app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
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
    
    </v-navigation-drawer>-->
    <v-toolbar color="transparent" dark fixed flat>
          <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
          <v-spacer class="hidden-md-and-up"></v-spacer>
          <v-toolbar-title to="/timeline"><router-link to="/timeline">{{appTitle}}</router-link></v-toolbar-title>
          <v-spacer class="hidden-sm-and-down"></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
              <v-btn v-if="!user" flat to="/sign-in">ログイン</v-btn>
              <v-btn v-if="!user" flat color="brown lighten-3" to="/join">新規登録</v-btn>
              <v-btn v-if="user" flat to="/about">プロフィール</v-btn>
              <v-btn v-if="user" flat outline color="white" @click="logout">ログアウト</v-btn>
          </v-toolbar-items>
          
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
