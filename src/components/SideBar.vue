<template>
  <v-navigation-drawer color="#46494C" permanent>
    <v-list>
      <v-list-item title="Company Name"></v-list-item>
    </v-list>
    <v-list density="compact" nav>
      <v-list-item
        to="/"
        :prepend-icon="mdiHome"
        title="Home"
        value="homepage"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiCurrencyUsd"
        title="Pay"
        value="paypage"
      ></v-list-item>
      <v-list-item
        to="/attendance"
        :prepend-icon="mdiAccountCheck"
        title="Attendance"
        value="attendpage"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiClockTimeFour"
        title="Time Off"
        value="timeoffpage"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiFormatListBulleted"
        title="Training"
        value="trainingpage"
      ></v-list-item>
      <v-list-item
        :prepend-icon="mdiAccountGroup"
        title="Employees"
        value="employeepage"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {
  mdiAccountCheck,
  mdiAccountGroup,
  mdiClockTimeFour,
  mdiCurrencyUsd,
  mdiFormatListBulleted,
  mdiHome,
} from "@mdi/js";
</script>
