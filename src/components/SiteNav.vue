<template>
  <nav id="nav">
    <div v-if="!loggedIn">
      <!-- <router-link to="/login">Login</router-link> -->
    </div>
    <div v-else>
      <router-link to="/dashboard">Dashboard</router-link>
      <a href="#" @click="logout()">Logout</a>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    ...mapState(["userProfile"]),
    loggedIn() {
      return Object.keys(this.userProfile).length > 1;
    }
  }
};
</script>

<style lang="scss" scoped>
#nav {
  margin: 0.5rem 0 0.5rem 0.5rem;

  div {
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    justify-items: stretch;
    column-gap: 0.5rem;
  }

  a {
    font-size: 0.875rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    padding: 0.3rem 0.7rem;
  }

  a {
    &.router-link-exact-active {
      background-color: #fff;
      color: #000;
    }
  }
}
</style>
