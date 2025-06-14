<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Payslip</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card max-height="800" class="ma-4">
    <v-data-table
      :items="pay"
      :headers="headers"
      hide-default-footer
      class="px-4"
      height="800"
      items-per-page="-1"
    >
      <!-- set button on table to be eye icon -->
      <template v-slot:item.payslip="{ item }">
        <v-btn
          icon
          flat
          size="sm"
          class="text-capitalize"
          :to="{
            name: 'PayslipDetail',
            query: {
              month: item.month,
              grossPay: item.grossPay,
              reimburse: item.reimburse,
              deduction: item.deduction,
              takeHome: item.takeHome,
            },
          }"
        >
          <v-icon :icon="mdiEye" color="#1985A1" />
        </v-btn>
      </template>

      <!-- Set value in table to Rp currency -->
      <template v-slot:item.grossPay="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <!-- Set value in table to Rp currency -->
      <template v-slot:item.reimburse="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>
      <template v-slot:item.deduction="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>
      <template v-slot:item.takeHome="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { mdiLogout, mdiMenuDown, mdiDownload, mdiEye } from "@mdi/js";

const pay = ref([
  {
    month: "January",
    grossPay: 3000000,
    reimburse: 0,
    deduction: 1000000,
    takeHome: 2000000,
  },
  {
    month: "February",
    grossPay: 1000000,
    reimburse: 0,
    deduction: 500000,
    takeHome: 500000,
  },
  {
    month: "March",
    grossPay: 2000000,
    reimburse: 0,
    deduction: 1000000,
    takeHome: 1000000,
  },
  {
    month: "April",
    grossPay: 3000000,
    reimburse: 0,
    deduction: 1500000,
    takeHome: 1500000,
  },
  {
    month: "May",
    grossPay: 2500000,
    reimburse: 500000,
    deduction: 1000000,
    takeHome: 2000000,
  },
]);

const headers = [
  { title: "Month", value: "month", align: "start", sortable: false },
  { title: "Gross Pay", value: "grossPay", align: "center", sortable: true },
  { title: "Reimburse", value: "reimburse", align: "center", sortable: true },
  { title: "Deduction", value: "deduction", align: "center", sortable: true },
  { title: "Take Home", value: "takeHome", align: "center", sortable: true },
  { title: "Detail", value: "payslip", align: "center", sortable: false },
];
</script>
