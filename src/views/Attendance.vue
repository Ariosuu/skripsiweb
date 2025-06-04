<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Attendance</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card height="800" class="pa-4 ml-5 mr-5">
    <v-card color="#D9D9D9" class="pa-4" no-gutters>
      <v-col cols="12">
        <v-row align="center">
          <v-col cols="1">
            <v-avatar color="surface-variant" size="x-large"> </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card-title>Eric Sebastian Chandra</v-card-title>
            <v-card-subtitle>Employee</v-card-subtitle>
          </v-col>
          <v-col cols="1">
            <v-btn variant="text" block base-color="#46494C" @click="clockIn">
              <v-icon
                color="#1985A1"
                slot="prepend-icon"
                :icon="mdiLoginVariant"
                :size="30"
              />
              <div class="pa-2 font-weight-medium" slot="default">CLOCK IN</div>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn variant="text" block base-color="#46494C">
              <v-icon
                color="#1985A1"
                slot="prepend-icon"
                :icon="mdiLoginVariant"
                :size="30"
              />
              <div
                class="pa-2 font-weight-medium"
                slot="default"
                @click="clockOut"
              >
                CLOCK OUT
              </div>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <h3 class="text-h6 ml-7 mt-10 mb-5">Attendance Log</h3>

    <v-row class="px-4 pb-4">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="timeRequest"
          hide-default-footer
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Clocked In</th>
              <th>Clocked Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in attendanceRecords" :key="index">
              <td>{{ record.date }}</td>
              <td>{{ record.clockedIn }}</td>
              <td>{{ record.clockedOut }}</td>
              <td>
                {{ record.status }}
              </td>
            </tr>
          </tbody>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
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

const attendanceRecords = ref([]);

const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const clockIn = () => {
  const now = new Date();
  const time = formatTime(now);
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const timeDecimal = hour + minutes / 60;

  const status = timeDecimal > 9 ? "Late" : "On Time";

  attendanceRecords.value.push({
    date: formatDate(),
    clockedIn: time,
    clockedOut: "-",
    status,
  });
};

const clockOut = () => {
  if (attendanceRecords.value.length > 0) {
    const lastRecord =
      attendanceRecords.value[attendanceRecords.value.length - 1];
    if (lastRecord.clockedOut === "-") {
      lastRecord.clockedOut = formatTime(new Date());
    }
  }
};
</script>
