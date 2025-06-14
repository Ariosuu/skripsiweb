import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Attendance from "../views/Attendance.vue";
import TimeOffView from "@/views/TimeOffView.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Training from "../views/Training.vue";
import SalaryDetailView from "@/views/SalaryDetailView.vue";

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
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/timeoff",
    name: "timeoff",
    component: TimeOffView,
  },
  {
    path: "/training",
    name: "Training",
    component: Training,
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
