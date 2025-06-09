<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Pay > Payslip</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-5" height="95%">
    <v-row class="px-4 pb-4 mt-5" justify="center">
      <v-col cols="12">
        <v-data-table :items="pay" :headers="headers" hide-default-footer>
          <template v-slot:item.payslip="{ item }">
            <v-btn
              variant="text"
              color="#1985A1"
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
              View
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { mdiLogout, mdiMenuDown, mdiDownload } from "@mdi/js";

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
  { title: "Month", value: "month", align: "center", sortable: false },
  { title: "Gross Pay", value: "grossPay", align: "center", sortable: true },
  { title: "Reimburse", value: "reimburse", align: "center", sortable: true },
  { title: "Deduction", value: "deduction", align: "center", sortable: true },
  { title: "Take Home", value: "takeHome", align: "center", sortable: true },
  { title: "Payslip", value: "payslip", align: "center", sortable: false },
];
</script>
