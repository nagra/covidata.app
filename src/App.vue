<template>
  <div id="app">
    <header id="header">
      <h1><router-link to="/">Covidata.</router-link></h1>
      <SiteNav></SiteNav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";

export default {
  components: {
    SiteNav
  }
};
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  margin: 1rem;
  justify-content: space-between;

  h1 {
    line-height: 1rem;
    text-align: left;
  }
}
</style>
