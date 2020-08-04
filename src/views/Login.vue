<template>
  <section class="login">
    <h1>Login</h1>
    <VerifyOTPForm v-if="showOTP"></VerifyOTPForm>
    <form v-on:submit.prevent v-else>
      <input
        v-model.trim="loginForm.phone"
        type="text"
        id="phone"
        autocorrect="off"
        autocapitalize="off"
        aria-required="true"
        required="required"
        spellcheck="false"
        placeholder="Phone Number"
        autofocus=""
      />
      <button id="login-button" :disabled="!canSubmit" @click="login()">
        Login
      </button>
    </form>
    <div id="recaptcha-container"></div>
  </section>
</template>

<script>
import * as fb from "../firebase";
import VerifyOTPForm from "@/components/VerifyOTPForm";

export default {
  data() {
    return {
      showOTP: false,
      appVerifier: "",
      loginForm: {
        phone: "",
      },
    };
  },
  components: {
    VerifyOTPForm,
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          phone: this.loginForm.phone,
          appVerifier: this.appVerifier,
        })
        .then((success) => {
          this.showOTP = success;
        })
        .then((error) => {
          console.log(error);
        });
    },
    recaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new fb.authClass.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log(response);
              // ...
            },
            "expired-callback": function(error) {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
              console.log(error);
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  computed: {
    canSubmit() {
      // TODO: validate for number
      return this.loginForm.phone != "";
    },
  },
  created() {
    this.recaptcha();
  },
};
</script>
