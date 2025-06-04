import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Payslip from "../views/Payslip.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/payslip",
    name: "Payslip",
    component: Payslip,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
