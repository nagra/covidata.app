<template>
  <form v-on:submit.prevent>
    <input
      v-model.trim="otp"
      type="text"
      id="otp"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      aria-required="true"
      required="required"
      spellcheck="false"
      placeholder="Verification Code"
      autofocus=""
    />
    <button id="verify-button" :disabled="!canSubmitOTP" @click="verify()">
      Verify
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      otp: ""
    };
  },
  methods: {
    verify() {
      this.$store.dispatch("verifyOTP", this.otp);
    }
  },
  computed: {
    canSubmitOTP() {
      // TODO: Check for numbers only
      return this.otp != "";
    }
  }
};
</script>
