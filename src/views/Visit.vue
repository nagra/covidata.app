<template>
  <div class="visit">
    <h1>Log a Visit</h1>
    <form v-on:submit.prevent>
      <input
        v-model.trim="firstName"
        name="first_name"
        type="text"
        autocapitalize="on"
        autocorrect="off"
        autocomplete="off"
        placeholder="First Name"
      />
      <input
        v-model.trim="lastName"
        name="last_name"
        type="text"
        autocapitalize="on"
        autocorrect="off"
        autocomplete="off"
        placeholder="Last Name"
      />
      <input
        v-model.trim="mobile"
        name="mobile"
        type="tel"
        placeholder="Mobile Number"
      />
      <button :disabled="!canSubmit" @click="log()">Log a Visit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      mobile: "",
      venue: "",
    };
  },
  methods: {
    log() {
      this.$store.dispatch("log", {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        venue: this.venue,
      });
    },
  },
  computed: {
    canSubmit() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.mobile.length > 0
      );
    },
  },
  created() {
    this.venue = this.$route.path.replace("/", "");
  },
};
</script>
