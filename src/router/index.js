import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ApproveTimeOffView from "@/views/ApproveTimeOffView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/approve-timeoff",
    name: "approve-timeoff",
    component: ApproveTimeOffView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
