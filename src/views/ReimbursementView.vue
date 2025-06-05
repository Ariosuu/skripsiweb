<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Reimbursement</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-row>
    <v-col cols="4">
      <v-select
        class="ma-4"
        :items="['January', 'February']"
        flat
        variant="solo"
        density="compact"
        hide-details
        v-model="currentMonth"
        prepend-inner-icon=""
      >
        <template v-slot:prepend-inner>
          <v-icon :icon="mdiFilter" size="sm" color="#207a9a" />
        </template>
      </v-select>
    </v-col>
    <v-spacer />
    <v-col class="d-flex align-center justify-end pr-7">
      <v-btn flat color="#1985A1">Add New Reimburse</v-btn></v-col
    >
  </v-row>

  <v-card class="ma-4 mt-0" height="96%">
    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-card-title>Total Reimbursement</v-card-title>
      <v-card-text class="text-h3 font-weight-bold">Rp 999.999.999</v-card-text>
    </v-card>
  </v-card>
</template>

<script setup>
import { mdiFilter, mdiLogout } from "@mdi/js";
import { ref } from "vue";

const currentMonth = ref("February");
</script>
