import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReimbursementView from "@/views/ReimbursementView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/reimbursement",
    name: "reimbursement",
    component: ReimbursementView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
