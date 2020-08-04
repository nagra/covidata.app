import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

//orderBy('createdOn', 'desc')

const store = new Vuex.Store({
  state: {
    userProfile: {},
    confirmationResult: {},
    visits: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setConfirmationResult(state, val) {
      state.confirmationResult = val;
    },
    setVisits(state, val) {
      state.visits = val;
    },
  },
  actions: {
    async login({ commit, dispatch }, args) {
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
    async fetchVisitsForOwner({ commit }, id) {
      const venue = await fb.venuesCollection.where("owner", "==", id).get();
      fb.visitsCollection
        .where("venue", "==", venue.docs[0].id)
        .onSnapshot((snapshot) => {
          let visitsArray = [];

          snapshot.forEach((doc) => {
            let visit = doc.data();
            visit.id = doc.id;
            visitsArray.push(visit);
          });

          commit("setVisits", visitsArray);
        });
    },
    async fetchUserProfile({ commit, dispatch }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      dispatch("fetchVisitsForOwner", user.uid);
      commit("setUserProfile", userProfile);

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/dashboard");
      }
    },
    async logout({ commit }) {
      // clear user data from state
      fb.auth.signOut();
      commit("setUserProfile", {});
      commit("setConfirmationResult", {});

      // redirect to login view
      router.push("/");
    },
    async seat({ state }, visit) {
      // seat visit
      console.log(visit);
      fb.visitsCollection.doc(visit.id).update({
        seated_at: new Date(),
      });
    },
    async left({ state }, visit) {
      // seat visit
      fb.visitsCollection.doc(visit.id).update({
        left_at: new Date(),
      });
    },
  },
  modules: {},
  getters: {},
});

export default store;
