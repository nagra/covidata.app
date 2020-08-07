<template>
  <div>
    <div id="app">
      <header id="header" v-if="!isHeaderHidden">
        <h1><router-link to="/">Covidata.</router-link></h1>
        <SiteNav></SiteNav>
      </header>
      <LoadingSpinner v-if="isLoading" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import LoadingSpinner from "@/components/LoadingSpinner";

export default {
  components: {
    SiteNav,
    LoadingSpinner,
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    isHeaderHidden() {
      return this.$route.meta.headerless
    }
  },
};
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  z-index: 1000;

  h1 {
    font-size: 2rem;
    line-height: 1rem;
    margin: 1rem 0;
    text-align: left;
  }
}
@media only screen and (min-width: 400px) {
  #header {
    h1 {
      font-size: 3rem;
    }
  }
}
</style>
