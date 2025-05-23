<template>
  <v-navigation-drawer color="#46494C" permanent>
    <v-list density="compact" nav>
      <v-list-item class="text-h6">Company Name</v-list-item>
      <v-divider class="pb-2" />
      <v-list-item
        link
        v-for="item in items"
        router
        :to="item.route"
        :prepend-icon="item.icon"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
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
  { icon: mdiCurrencyUsd, title: "Pay", route: "/pay" },
  { icon: mdiAccountCheck, title: "Attendance", route: "/attendance" },
  { icon: mdiClockTimeFour, title: "Time Off", route: "/timeoff" },
  { icon: mdiFormatListBulleted, title: "Training", route: "/training" },
  { icon: mdiAccountGroup, title: "Employees", route: "/employees" },
]);
</script>
