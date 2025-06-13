<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Employee List</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>
  <v-row>
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
          flat
          @click:append-inner="onClick"
        >
        </v-text-field>
      </v-card-text>
    </v-col>
  </v-row>

  <v-card max-height="750" class="ma-4 mt-0" color="#FFFFFF">
    <v-data-table
      :headers="headers"
      :items="items"
      class="px-4"
      height="750"
      hide-default-footer
      items-per-page="-1"
    >
      <template v-slot:item.dob="{ value }">
        {{ value.toLocaleDateString() }}
      </template>

      <template v-slot:item.status="{ value }">
        <v-chip :color="chipColor(value)">{{ value }}</v-chip>
      </template>

      <template v-slot:item.view="{ item }">
        <v-tooltip text="View Employee Profile">
          <template v-slot:activator="{ props }">
            <v-btn icon flat v-bind="props" size="sm">
              <v-icon :icon="mdiEye" color="#1985A1" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
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
  mdiEye,
} from "@mdi/js";

import { ref } from "vue";

const headers = ref([
  { title: "Name", key: "name", align: "start", width: 320 },
  { title: "Division", key: "div", align: "start" },
  { title: "Position", key: "pos", align: "start" },
  { title: "Date Of Birth", key: "dob", align: "center" },
  { title: "Contact Number", key: "contact", align: "start", width: 200 },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "", key: "view", align: "center", sortable: false },
]);

const items = ref([
  {
    name: "Eric Sebastian Chandra",
    div: "Human Resource",
    pos: "Team Leader",
    dob: new Date("06/12/2002"),
    contact: "08118300806",
    status: "Active",
  },
  {
    name: "Daniel Garyo",
    div: "IT Development",
    pos: "UX Designer",
    dob: new Date("06/12/2002"),
    contact: "08118300806",
    status: "Active",
  },
]);

const loaded = ref(false);
const loading = ref(false);

const chipColor = (x) => {
  if (x == "Active") {
    return "green";
  } else if (x == "Inactive") {
    return "red";
  }
};

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}
</script>
