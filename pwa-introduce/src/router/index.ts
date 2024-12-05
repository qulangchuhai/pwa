import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/about.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/frame",
    name: "Frame",
    component: () => import("../views/frameto.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/about.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
