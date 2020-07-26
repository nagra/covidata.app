import Vue from "vue";
import VueRouter from 'vue-router';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Account from "../views/Account.vue";
import SignUp from "../views/SignUp.vue";
import { auth } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if(requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router;
