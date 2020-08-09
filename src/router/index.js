import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Visit from "../views/Visit.vue";
import Success from "../views/Success.vue";
import { auth } from "../firebase";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Covidata."
    }
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
    meta: {
      title: "Successfully Logged",
      headerless: true
    }
  },
  {
    path: "/:id",
    component: Visit,
    meta: {
      title: "Log a Visit",
      headerless: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Covidata.";

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
