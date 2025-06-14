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
          v-model="search"
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
      :items="filteredItems"
      class="px-4"
      height="750"
      hide-default-footer
      items-per-page="-1"
    >
      <template v-slot:item.formattedDate="{ value }">
        {{ value }}
      </template>

      <template v-slot:item.empStatus="{ value }">
        <v-chip :color="chipColor(value)">{{ value }}</v-chip>
      </template>

      <template v-slot:item.view="{ item }">
        <v-tooltip text="View Employee Profile">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              size="sm"
              :to="{
                name: 'Employee Profile',
                query: {
                  fullName: item.fullName,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  jobDivision: item.jobDivision,
                  jobTitle: item.jobTitle,
                  status: item.empStatus,
                  dateOfBirth: item.formattedDate,
                  phoneNumber: item.phoneNumber,
                  email: item.email,
                },
              }"
            >
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

import { ref, watch, computed } from "vue";
import { db } from "@/firebase/config";
import { Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";
import getCollection from "@/composables/getCollection";

const loaded = ref(false);
const loading = ref(false);
const search = ref("");

const auth = getAuth();
const { documents: items } = getCollection("employees");

watch(
  items,
  (newItems) => {
    if (newItems) {
      newItems.forEach((item) => {
        if (item.dateofBirth instanceof Timestamp) {
          item.formattedDate = item.dateofBirth
            .toDate()
            .toLocaleDateString("en-US");
        } else {
          item.formattedDate = "N/A";
        }
      });
    }
  },
  { immediate: true }
);

watch(
  items,
  (newItems) => {
    if (newItems) {
      newItems.forEach((item) => {
        if (item.firstName && item.lastName) {
          item.fullName = item.firstName + " " + item.lastName;
        } else {
          item.fullName = item.firstName || item.lastName || "N/A";
        }
      });
    }
  },
  { immediate: true }
);

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  const searchTerm = search.value.toLowerCase();
  return items.value.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  });
});

const headers = ref([
  { title: "Name", key: "fullName", align: "start", width: 320 },
  { title: "Division", key: "jobDivision", align: "start" },
  { title: "Position", key: "jobTitle", align: "start" },
  { title: "Date Of Birth", key: "formattedDate", align: "center" },
  { title: "Contact Number", key: "phoneNumber", align: "start", width: 200 },
  { title: "Status", key: "empStatus", align: "center", sortable: false },
  { title: "", key: "view", align: "center", sortable: false },
]);

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
