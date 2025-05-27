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
        <v-col cols="8">
          <span class="pl-2 text-h6 font-weight-bold">Leave Request</span>
          <v-data-table
            :headers="headers"
            :items="timeRequest"
            hide-default-footer
          >
            <template v-slot:item.detail>
              <v-btn icon flat size="sm">
                <v-icon :icon="mdiEye" color="#1985A1" />
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="4">
          <v-card flat color="#D9D9D9">
            <v-card-title class="text-h6">Leave Request History</v-card-title>
            <v-card-text>
              <v-card flat>
                <v-card-text class="pa-0 bg-transparent|">
                  <v-card
                    title="Sick Leave"
                    subtitle="18/06/2048 - 26/06/2048"
                    flat
                    class="pa-0"
                  >
                    <template v-slot:append>
                      <v-chip color="green">Approved</v-chip>
                    </template>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { mdiEye, mdiLogout } from "@mdi/js";
import { ref } from "vue";

const timeRequest = ref([
  {
    type: "Diddy Do It",
    from: "18/02/2025",
    to: "18/02/2025",
    notes: "Baby Powder",
  },
]);

const headers = ref([
  { title: "Type", key: "type", align: "start" },
  { title: "From", key: "from", align: "center" },
  { title: "To", key: "to", align: "center" },
  { title: "Notes", key: "notes", align: "start" },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);
</script>
