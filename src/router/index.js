import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Payslip from "../views/Payslip.vue";
import PayslipDetail from "../views/PayslipDetail.vue";

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
  {
    path: "/payslipdetail",
    name: "PayslipDetail",
    component: PayslipDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
