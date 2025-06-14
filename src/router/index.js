import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Attendance from "../views/Attendance.vue";
import TimeOffView from "@/views/TimeOffView.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Training from "../views/Training.vue";
import SalaryDetailView from "@/views/SalaryDetailView.vue";
import Payslip from "../views/Payslip.vue";
import PayslipDetail from "../views/PayslipDetail.vue";
import Employees from "../views/Employees.vue";
import EmployeeProfile from "@/views/EmployeeProfile.vue";

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
  {
    path: "/payslip",
    name: "Payslip",
    component: Payslip,
  },
  {
    path: "/payslipdetail",
    name: "PayslipDetail",
    component: PayslipDetail,
    path: "/employees",
    name: "Employees",
    component: Employees,
  },

  {
    path: "/employee-profile",
    name: "Employee Profile",
    component: EmployeeProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
