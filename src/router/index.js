import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Employees from "../views/Employees.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
