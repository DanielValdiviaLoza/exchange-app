import { createRouter, createWebHistory } from "vue-router";
import PageHome from "@/views/PageHome";
import PageAbout from "@/views/PageAbout";
import PageError from "@/views/PageError";
import CoinDetail from "@/views/CoinDetail";

const routes = [
  {
    path: "/",
    name: "PageHome",
    component: PageHome,
  },
  {
    path: "/about",
    name: "PageAbout",
    component: PageAbout,
  },
  {
    path: "/coin/:id",
    name: "coin-detail",
    component: CoinDetail,
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: PageError,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
