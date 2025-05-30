<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Employees</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-col cols="12" class="pl-10 pt-10">
    <v-row align="center">
      <v-col cols="9">
        <h1 class="text-grey-darken-3">Employee List</h1>
      </v-col>
      <v-col cols="3">
        <v-card-text>
          <v-text-field
            :loading="loading"
            :append-inner-icon="mdiMagnify"
            density="compact"
            label="Search Employees"
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick"
          >
          </v-text-field>
        </v-card-text>
      </v-col>
    </v-row>
  </v-col>

  <v-card height="710" class="pa-4 ml-5 mr-5" color="#FFFFFF">
    <v-table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Division</th>
          <th>Position</th>
          <th>Date of Birth</th>
          <th>Contact Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.div }}</td>
          <td>{{ item.pos }}</td>
          <td>{{ item.dob }}</td>
          <td>{{ item.cont }}</td>
          <td>
            {{ item.stat }}
            <v-btn rounded="xl" variant="text" :ripple="false">
              <v-icon
                color="#1985A1"
                slot="prepend-icon"
                :icon="mdiEyeOutline"
                :size="20"
              />
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
  mdiEyeOutline,
} from "@mdi/js";

import { ref } from "vue";

const items = ref([
  {
    name: "Eric Sebastian Chandra",
    div: "Human Resource",
    pos: "Team Leader",
    dob: "06/12/2002",
    cont: "08118300806",
    stat: "Active",
  },
  {
    name: "Daniel Garyo",
    div: "IT Development",
    pos: "UX Designer",
    dob: "06/12/2002",
    cont: "08118300806",
    stat: "Active",
  },
]);

const loaded = ref(false);
const loading = ref(false);

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}
</script>
