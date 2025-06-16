import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ApproveReimburse from "@/views/ApproveReimburseView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/approve-reimbursement",
    name: "Approve Reimbursement",
    component: ApproveReimburse,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
