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

    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="reimbursement"
      class="px-4"
    >
      <template v-slot:item.date="{ value }">
        {{ value.toLocaleDateString() }}
      </template>

      <template v-slot:item.bill="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <template v-slot:item.approved="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <template v-slot:item.detail="{ item }">
        <v-btn icon flat size="sm" @click="console.log('test')">
          <v-icon :icon="mdiEye" color="#1985A1" />
        </v-btn>
      </template>

      <template v-slot:item.status="{ value }">
        <v-chip :color="chipColor(value)">{{ value }}</v-chip>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="reimburseDialog"> </v-dialog>
</template>

<script setup>
import { mdiFilter, mdiLogout, mdiEye } from "@mdi/js";
import { ref } from "vue";

const currentMonth = ref("February");
const reimburseDialog = ref(false);

const headers = ref([
  { title: "Claim Number", key: "claimId", align: "start", width: 175 },
  { title: "Claim Date", key: "date", align: "center" },
  { title: "Total Bill", key: "bill", align: "start" },
  { title: "Approved Amount", key: "approved", align: "start" },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);

const chipColor = (x) => {
  if (x == "Approved") {
    return "green";
  } else if (x == "Pending") {
    return "orange";
  } else if (x == "Rejected") {
    return "red";
  }
};

const reimbursement = ref([
  {
    name: "Daniel Garyo",
    claimId: "CL001",
    date: new Date(),
    bill: 20000,
    approved: 10000,
    status: "Approved",
  },
]);
</script>
