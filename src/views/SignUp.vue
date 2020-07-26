<template>
  <section class="sign-up">
    <h1>Sign Up</h1>
    <SignUpForm></SignUpForm>
  </section>
</template>
<script>
import SignUpForm from '@/components/SignUpForm'

export default {
  components: {
    SignUpForm
  },
  data() {
    return {
      signUpForm: {
       
      },
    };
  },
};
</script>
