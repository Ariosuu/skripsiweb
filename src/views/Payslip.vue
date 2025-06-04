<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Pay > Payslip</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-5" height="95%">
    <div class="d-flex align-center" style="padding: 16px 0 0 16px">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="text">
            Month: {{ selectedMonth }}
            <v-icon right :icon="mdiMenuDown" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="month in months"
            :key="month"
            @click="selectMonth(month)"
          >
            <v-list-item-title>{{ month }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <br />
    <v-row class="px-4 pb-4" justify="center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="pay"
          hide-default-footer
          class="w-100"
        >
          <thead>
            <tr>
              <th class="text-center">Month</th>
              <th class="text-center">Gross Pay</th>
              <th class="text-center">Reimburse</th>
              <th class="text-center">Deduction</th>
              <th class="text-center">Take Home</th>
              <th class="text-center">Payslip</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pay" :key="item.month">
              <td class="text-center">{{ selectedMonth }}</td>
              <td class="text-center">{{ item.grossPay }}</td>
              <td class="text-center">{{ item.reimburse }}</td>
              <td class="text-center">{{ item.deduction }}</td>
              <td class="text-center">{{ item.takeHome }}</td>
              <td class="text-center">
                <v-btn variant="text" color="primary">Download</v-btn>
              </td>
            </tr>
          </tbody>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { mdiLogout, mdiMenuDown } from "@mdi/js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pay = ref([
  {
    month: "January",
    grossPay: "$3000",
    reimburse: "$200",
    deduction: "$100",
    takeHome: "$3100",
  },
]);
const selectedMonth = ref(months[0]);

function selectMonth(month) {
  selectedMonth.value = month;
}
</script>
