<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Home > Training</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-col cols="12" class="pl-10 pt-10">
    <v-row align="center">
      <v-col cols="10">
        <h1 class="text-grey-darken-3">View My Training</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn variant="text">
          <p class="pr-3">Search</p>
          <v-icon
            color="#1985A1"
            slot="prepend-icon"
            :icon="mdiMagnify"
            :size="20"
          />
        </v-btn>
      </v-col>
    </v-row>
  </v-col>

  <v-card height="720" class="pa-4 ml-5 mr-5" color="#FFFFFF">
    <v-table>
      <thead>
        <tr>
          <th>Training Name</th>
          <th>Training Date</th>
          <th>Training Hours</th>
          <th>Trainer Name</th>
          <th>Training Type</th>
          <th>Trainer Score</th>
          <th>Trainer Evaluation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.Tname }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.durat }}</td>
          <td>{{ item.trainer }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
  mdiMagnify,
} from "@mdi/js";

import { ref } from "vue";

const items = ref([
  {
    Tname: "Building Safety",
    date: "11/9/2001",
    durat: 90,
    trainer: "John K.",
    type: "Practical Training",
    score: 100,
    status: "In Progress",
  },
  {
    Tname: "Self Discipline",
    date: "11/9/2001",
    durat: 70,
    trainer: "John F.",
    type: "Practical Training",
    score: 100,
    status: "Completed",
  },
]);
</script>
