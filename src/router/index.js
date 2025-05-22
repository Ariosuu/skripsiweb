import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Attendance from "../views/Attendance.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
