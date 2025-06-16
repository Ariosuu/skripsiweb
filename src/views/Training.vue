<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">My Training</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-row>
    <v-col cols="6">
      <v-text-field
        class="ma-4"
        v-model="search"
        :loading="loading"
        :append-inner-icon="mdiMagnify"
        density="compact"
        label="Search Training"
        variant="solo"
        hide-details
        single-line
        flat
        style="max-width: 340px; min-width: 200px; margin-right: 16px"
      >
      </v-text-field>
    </v-col>
  </v-row>

  <v-card min-height="90%" class="ma-4 mt-0" color="#FFFFFF">
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="filteredItems"
      class="px-4"
    >
      <template v-slot:item.formattedDate="{ value }">
        {{ value }}
      </template>
      <template v-slot:item.duration="{ value }">
        {{ value }} minutes
      </template>

      <template v-slot:item.link="{ value }">
        <v-tooltip text="Go To Training">
          <template v-slot:activator="{ props }">
            <v-btn icon flat v-bind="props" size="sm" @click="redirect(value)">
              <v-icon :icon="mdiChevronRight" color="#1985A1" />
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
} from "@mdi/js";

import { ref, watch, computed } from "vue";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import getCollection from "@/composables/getCollection";

const { documents: items } = getCollection("training");
const search = ref("");

const headers = ref([
  { title: "Training Name", key: "trainingName", align: "start", width: 200 },
  { title: "Date", key: "formattedDate", align: "center" },
  { title: "Duration", key: "duration", align: "center" },
  { title: "Trainer", key: "trainer", align: "start", width: 200 },
  { title: "Type", key: "type", align: "center" },
  { title: "", key: "link", align: "end", sortable: "false" },
]);

watch(
  items,
  (newItems) => {
    if (newItems) {
      newItems.forEach((item) => {
        if (item.date instanceof Timestamp) {
          item.formattedDate = item.date.toDate().toLocaleDateString("en-US");
        } else {
          item.formattedDate = "N/A";
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

const redirect = (x) => {
  window.open(x);
};
</script>
