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
              grossPay: item.basic,
              reimburse: item.totAllow,
              deduction: item.deductions,
              takeHome: item.takeHome,
              comAllow: item.comAllow,
              transAllow: item.transAllow,
              bpjs: item.bpjs,
              jht: item.jht,
            },
          }"
        >
          <v-icon :icon="mdiEye" color="#1985A1" />
        </v-btn>
      </template>

      <!-- Set value in table to Rp currency -->
      <template v-slot:item.basic="{ value }">
        {{
          value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <!-- Set value in table to Rp currency -->
      <template v-slot:item.totAllow="{ value }">
        {{
          value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>
      <template v-slot:item.deductions="{ value }">
        {{
          value.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>
      <template v-slot:item.takeHome="{ value }">
        {{
          value.toLocaleString("id-ID", {
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
import { mdiMenuDown, mdiDownload, mdiEye } from "@mdi/js";
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
  mdiAccountCheck,
  mdiAccountGroup,
  mdiClockTimeFour,
  mdiCurrencyUsd,
  mdiFormatListBulleted,
  mdiHome,
} from "@mdi/js";

import { db } from "@/firebase/config";
import { collection, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";

const auth = getAuth();
const userRef = collection(db, "employees");
const ID = ref();

const pay = ref([]);
onAuthStateChanged(auth, (user) => {
  if (user) {
    getDocs(userRef).then((snapshot) => {
      let docs = [];
      snapshot.docs.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const currentUser = docs.find(
        (doc) => doc.uid === user.uid || doc.email === user.email
      );
      if (currentUser) {
        ID.value = currentUser.id;

        getDocs(collection(db, "employees", ID.value, "salary")).then(
          (snapshot) => {
            let docs = [];
            snapshot.docs.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            pay.value = docs;
          }
        );
      } else {
        console.error("User not found in the database.");
      }
    });
  }
});

const headers = [
  { title: "Month", value: "month", align: "start", sortable: false },
  { title: "Salary", value: "basic", align: "center", sortable: true },
  { title: "Allowance", value: "totAllow", align: "center", sortable: true },
  {
    title: "Deduction",
    value: "deductions",
    align: "center",
    sortable: true,
  },
  { title: "Take Home", value: "takeHome", align: "center", sortable: true },
  { title: "Detail", value: "payslip", align: "center", sortable: false },
];
</script>
