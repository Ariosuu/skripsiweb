<template>
  <div style="background-color: #dcdcdd; min-height: 100%">
    <v-app-bar color="#C5C3C6" flat height="64">
      <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Attendance</p>
      <v-spacer></v-spacer>
      <v-avatar color="surface-variant" size="small"> </v-avatar>
      <v-btn :icon="mdiLogout"> </v-btn>
    </v-app-bar>

    <v-card class="fill-height pa-4 ml-5 mr-5">
      <v-card color="#D9D9D9" class="pa-4 fill-height" no-gutters>
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="1">
              <v-avatar color="surface-variant" size="x-large"> </v-avatar>
            </v-col>
            <v-col cols="9">
              <h2 class="text-h5 mb-1">Eric Sebastian Chandra</h2>
              <div class="text-subtitle-1">Employee</div>
            </v-col>
            <v-col cols="1">
              <v-btn color="#46494C" :prepend-icon="mdiLoginVariant"
                >Clock In</v-btn
              >
            </v-col>
            <v-col cols="1">
              <v-btn :prepend-icon="mdiLogoutVariant"> Clock Out</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-card>

      <h3 class="text-h6 ml-7 mt-10 mb-5">Attendance Log</h3>

      <v-card color="#D9D9D9" class="pa-4 fill-height" no-gutters>
        <v-row class="px-4 pb-4">
          <v-col cols="12">
            <v-table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Clocked In</th>
                  <th>Clocked Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>18/2/2025</th>
                  <th>09:00</th>
                  <th>09:00</th>
                  <th>On Time</th>
                </tr>
                <tr>
                  <th>18/2/2025</th>
                  <th>09:00</th>
                  <th>09:00</th>
                  <th>On Time</th>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script setup>
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
  mdiAccountCheck,
  mdiAccountGroup,
  mdiClockTimeFour,
  mdiCurrencyUsd,
  mdiFormatListBulleted,
  mdiHome,
} from "@mdi/js";
</script>

<style scoped>
.v-table {
  background-color: #d9d9d9;
}

.v-table th {
  color: #46494c;
  font-weight: 600;
}

.v-table td {
  color: #46494c;
}
</style>
