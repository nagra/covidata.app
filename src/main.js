import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fb from "./firebase";
import "./assets/scss/app.scss";

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});
