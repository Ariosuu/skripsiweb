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
              to="/payslipdetail"
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
    grossPay: "Rp 3.000.000",
    reimburse: "Rp 0",
    deduction: "Rp 1.000.000",
    takeHome: "Rp 2.000.000",
  },
  {
    month: "February",
    grossPay: "Rp 1.000.000",
    reimburse: "Rp 0",
    deduction: "Rp 500.000",
    takeHome: "Rp 500.000",
  },
  {
    month: "March",
    grossPay: "Rp 15.000.000",
    reimburse: "Rp 0",
    deduction: "Rp 1.000.000",
    takeHome: "Rp 14.000.000",
  },
  {
    month: "April",
    grossPay: "Rp 5.000.000",
    reimburse: "Rp 200.000",
    deduction: "Rp 1.000.000",
    takeHome: "Rp 4.200.000",
  },
  {
    month: "May",
    grossPay: "Rp 3.000.000",
    reimburse: "Rp 0",
    deduction: "Rp 1.000.000",
    takeHome: "Rp 2.000.000",
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
