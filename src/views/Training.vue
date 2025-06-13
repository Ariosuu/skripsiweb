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

  <v-card min-height="90%" class="ma-4 mt-0" color="#FFFFFF">
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="items"
      class="px-4"
    >
      <template v-slot:item.date="{ value }">
        {{ value.toLocaleDateString() }}
      </template>
      <template v-slot:item.duration="{ value }"> {{ value }} minute </template>

      <template v-slot:item.view="{ value }">
        <v-tooltip text="Go To Training">
          <template v-slot:activator="{ props }">
            <v-btn icon flat v-bind="props" size="sm">
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

import { ref } from "vue";

const headers = ref([
  { title: "Training Name", key: "trainingName", align: "start", width: 200 },
  { title: "Date", key: "date", align: "center" },
  { title: "Duration", key: "duration", align: "center" },
  { title: "Trainer", key: "trainer", align: "start", width: 200 },
  { title: "Type", key: "type", align: "center" },
  { title: "", key: "view", align: "end", sortable: "false" },
]);

const items = ref([
  {
    trainingName: "Building Safety",
    date: new Date(),
    duration: 90,
    trainer: "John K.",
    type: "Practical Training",
  },
  {
    trainingName: "Self Discipline",
    date: new Date(),
    duration: 70,
    trainer: "John F.",
    type: "Practical Training",
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
