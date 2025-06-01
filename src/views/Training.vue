<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Home > Training</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-col cols="12" class="pl-10 pt-10">
    <v-row align="center">
      <v-col>
        <h1 class="text-grey-darken-3">View My Training</h1>
      </v-col>
      <v-col cols="auto" class="d-flex justify-end">
        <v-text-field
          v-model="search"
          :loading="loading"
          :append-inner-icon="mdiMagnify"
          density="compact"
          label="Search Training"
          variant="solo"
          hide-details
          single-line
          @click:append-inner="
            () => {
              applySearch();
              onClick();
            }
          "
          @keyup.enter="
            () => {
              applySearch();
              onClick();
            }
          "
          style="max-width: 340px; min-width: 200px; margin-right: 16px"
        >
        </v-text-field>
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <td>{{ item.Tname }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.durat }}</td>
          <td>{{ item.trainer }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.status }}</td>
          <td>
            <v-btn
              color="#1694CF"
              style="color: #fff"
              size="small"
              variant="flat"
            >
              Download
            </v-btn>
          </td>
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

const loaded = ref(false);
const loading = ref(false);
const search = ref("");
const filteredItems = ref([...items.value]);

function applySearch() {
  const s = search.value.trim().toLowerCase();
  if (!s) {
    filteredItems.value = [...items.value];
    return;
  }
  filteredItems.value = items.value.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(s))
  );
}

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 1000);
}
</script>
