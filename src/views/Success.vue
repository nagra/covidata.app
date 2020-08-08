<template>
  <div class="success">
    <h1>Success</h1>
    <p>Your visit has been successfully recorded and will be deleted after 21 days.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.$store.dispatch("loading", false);
  }
};
</script>
<style scoped>
.success h1 {
  text-align: center;
}
</style>