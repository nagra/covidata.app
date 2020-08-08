/* eslint-disable no-unused-vars */
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
    loading: false,
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
    setLoading(state, val) {
      state.loading = val;
    },
  },
  actions: {
    async loading({ commit }, isShown) {
      commit("setLoading", isShown);
    },
    async login({ commit, dispatch }, args) {
      // sign user in
      return new Promise(function(resolve, reject) {
        fb.auth
          .signInWithPhoneNumber(args.phone, args.appVerifier)
          .then(confirmationResult => {
            commit("setConfirmationResult", confirmationResult);
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async verifyOTP({ dispatch }, code) {
      this.state.confirmationResult.confirm(code).then(function(result) {
        dispatch("fetchUserProfile", result.user);
      });
    },
    async fetchVisitsForOwner({ commit }, id) {
      const roleID = "roles." + id;
      const venue = await fb.venuesCollection
        .where(roleID, "in", ["owner", "editor"])
        .get();
      if (venue.size == 0) {
        return;
      }
      fb.visitsCollection
        .where("venue", "==", venue.docs[0].id)
        .onSnapshot(snapshot => {
          let visitsArray = [];

          snapshot.forEach(doc => {
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
    async log({ dispatch }, { log, venueID }) {
      // seat visit
      await fb.visitsCollection.doc().set({
        user: {
          first_name: log.firstName,
          last_name: log.lastName,
          total_guests: log.totalGuests,
          mobile: log.mobile,
        },
        masked: {
          name: log.maskedName,
          mobile: log.maskedMobile,
        },
        venue: venueID,
        created_at: new Date()
      });
      dispatch("loading", false);
      // redirect to login view
      router.push("/success");
    },
    async getVenue({ dispatch }, username) {
      return new Promise((resolve, reject) => {
        fb.venuesCollection
          .where("username", "==", username)
          .get()
          .then(result => {
            if(result.size == 0) {
              reject(new Error('NO_RESULTS'));
              return;
            }
            const venue = result.docs[0].data();

            if (venue.address) {
              const address = [
                typeof venue.address.address_line_1 != undefined
                  ? venue.address.address_line_1
                  : false,
                typeof venue.address.address_line_2 != undefined
                  ? venue.address.address_line_2
                  : false,
                typeof venue.address.city != undefined
                  ? venue.address.city
                  : false,
                typeof venue.address.postcode != undefined
                  ? venue.address.postcode
                  : false,
              ]
                .filter(Boolean)
                .join(", ");

              if (address) {
                venue.formattedAddress = address;
              }
            }

            venue.id = result.docs[0].id;

            resolve(venue);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
  modules: {},
  getters: {},
});

export default store;
