import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Training from "../views/Training.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/training",
    name: "Training",
    component: Training,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
