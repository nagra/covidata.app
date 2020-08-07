<template>
  <section class="login">
    <h1>Login</h1>
    <form v-on:submit.prevent v-if="showOTP">
      <input
        v-model.trim="loginForm.otp"
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
import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as fb from "../firebase";

export default {
  data() {
    return {
      showOTP: false,
      appVerifier: "",
      loginForm: {
        phone: "",
        otp: "",
      },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          phone: this.formattedNumber,
          appVerifier: this.appVerifier,
        })
        .then(success => {
          this.showOTP = success;
        })
        .then(error => {
          console.log(error);
        });
    },
    verify() {
      this.$store.dispatch("verifyOTP", this.loginForm.otp);
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
    formattedNumber() {
      if (this.loginForm.phone.length == 0) {
        return "";
      }
      var parsed = parsePhoneNumberFromString(this.loginForm.phone, "GB");
      if (!parsed) {
        return "";
      }
      return parsed.number;
    },
    canSubmit() {
      // TODO: validate for number
      return this.loginForm.phone != "";
    },
    canSubmitOTP() {
      // TODO: Check for numbers only
      return this.loginForm.otp != "";
    },
  },
  created() {
    this.recaptcha();
  },
};
</script>
