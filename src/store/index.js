import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    confirmationResult: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setConfirmationResult(state, val) {
      state.confirmationResult = val;
    },
  },
  actions: {
    async login({ commit }, args) {
      // sign user in
      return new Promise(function(resolve, reject) {
        fb.auth
          .signInWithPhoneNumber(args.phone, args.appVerifier)
          .then((confirmationResult) => {
            commit("setConfirmationResult", confirmationResult);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async verifyOTP({ dispatch }, code) {
      this.state.confirmationResult
        .confirm(code)
        .then((result) => {
          dispatch("fetchUserProfile", result.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      console.log(userProfile.data());
      commit("setUserProfile", userProfile);

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
  },
  modules: {},
  getters: {},
});

export default store;