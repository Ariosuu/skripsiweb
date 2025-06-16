<template>
  <v-navigation-drawer color="#46494C" :permanent="mdAndUp">
    <v-list density="compact" nav :opened="['Pay']">
      <v-list-item class="text-h6">Company Name</v-list-item>
      <v-divider class="pb-2" />
      <v-container class="pa-0" v-for="item in items">
        <v-list-item
          v-if="!item.sub"
          link
          router
          :to="item.route"
          :prepend-icon="item.icon"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-group v-else :value="item.title">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-for="sub in item.sub" link router :to="sub.route">
            <v-list-item-title>{{ sub.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import {
  mdiAccountCheck,
  mdiAccountGroup,
  mdiClockTimeFour,
  mdiCurrencyUsd,
  mdiFormatListBulleted,
  mdiHome,
} from "@mdi/js";

const items = ref([
  { icon: mdiHome, title: "Home", route: "/" },
  {
    icon: mdiCurrencyUsd,
    title: "Pay",
    sub: [
      { title: "Salary Details", route: "/salary-detail" },
      { title: "PaySlip", route: "/payslip" },
      { title: "Reimbursement", route: "/reimbursement" },
      { title: "Approve Reimbursement", route: "/approve-reimbursement" },
    ],
  },
  { icon: mdiAccountCheck, title: "Attendance", route: "/attendance" },
  { icon: mdiClockTimeFour, title: "Time Off", route: "/timeoff" },
  { icon: mdiFormatListBulleted, title: "Training", route: "/training" },
  { icon: mdiAccountGroup, title: "Employees", route: "/employees" },
]);

const { mdAndUp, mdAndDown } = useDisplay();
</script>
