import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SalaryDetailView from "@/views/SalaryDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/salary-detail",
    name: "salary-detail",
    component: SalaryDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
