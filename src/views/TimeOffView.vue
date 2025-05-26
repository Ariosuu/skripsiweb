<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Time Off</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-4">
    <v-card-text>
      <v-card flat color="#D9D9D9">
        <v-card-title class="pa-6">
          <div class="text-h5 font-weight-bold d-flex justify-space-between">
            <span>
              Leave Remaining : <span style="color: #1985a1">5 Days</span>
            </span>

            <span><v-btn color="#1985A1" flat>Request Leave</v-btn></span>
          </div>
        </v-card-title>
      </v-card>

      <v-row class="pt-4">
        <v-col cols="8"></v-col>
        <v-col cols="4">
          <v-card flat color="#D9D9D9"><v-card-text>Test</v-card-text></v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { mdiLogout } from "@mdi/js";
</script>
