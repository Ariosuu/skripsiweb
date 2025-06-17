<template>
  <v-navigation-drawer color="#46494C" :permanent="mdAndUp">
    <v-list density="compact" nav :opened="['Pay']">
      <v-list-item class="text-h6">Company Name</v-list-item>
      <v-divider class="pb-2" />
      <v-container
        class="pa-0"
        v-for="item in displayedItems"
        :key="item.title"
      >
        <v-list-item link router :to="item.route" :prepend-icon="item.icon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-container>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import {
  mdiAccountCash,
  mdiAccountCheck,
  mdiAccountGroup,
  mdiCashSync,
  mdiClockTimeFour,
  mdiCurrencyUsd,
  mdiFileClock,
  mdiFormatListBulleted,
  mdiHome,
  mdiPlaylistEdit,
} from "@mdi/js";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
  Timestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const userRef = collection(db, "employees");
const empRole = ref();

const items = ref([
  { icon: mdiHome, title: "Home", route: "/home" },
  {
    icon: mdiCurrencyUsd,
    title: "PaySlip",
    route: "/payslip",
  },
  { icon: mdiCashSync, title: "Reimbursement", route: "/reimbursement" },
  {
    icon: mdiAccountCash,
    title: "Approve Reimbursement",
    route: "/approve-reimbursement",
  },
  { icon: mdiAccountCheck, title: "Attendance", route: "/attendance" },
  { icon: mdiClockTimeFour, title: "Time Off", route: "/timeoff" },
  {
    icon: mdiFileClock,
    title: "Approve Time Off",
    route: "/approve-timeoff",
  },
  { icon: mdiFormatListBulleted, title: "Training", route: "/training" },
  {
    icon: mdiPlaylistEdit,
    title: "Training List",
    route: "/training-list",
  },
  { icon: mdiAccountGroup, title: "Employees", route: "/employees" },
]);

const items2 = ref([
  { icon: mdiHome, title: "Home", route: "/home" },
  {
    icon: mdiCurrencyUsd,
    title: "PaySlip",
    route: "/payslip",
  },
  { icon: mdiCashSync, title: "Reimbursement", route: "/reimbursement" },
  { icon: mdiAccountCheck, title: "Attendance", route: "/attendance" },
  { icon: mdiClockTimeFour, title: "Time Off", route: "/timeoff" },
  { icon: mdiFormatListBulleted, title: "Training", route: "/training" },
]);
const { mdAndUp, mdAndDown } = useDisplay();

const displayedItems = computed(() => {
  return empRole.value ? items.value : items2.value;
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const querySnapshot = await getDocs(userRef);
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const currentUser = docs.find(
        (doc) => doc.uid === user.uid || doc.email === user.email
      );
      if (currentUser) {
        empRole.value = currentUser.isHR;
      } else {
        console.error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
});
</script>

<style scoped>
.v-list-item--disabled {
  color: #ffffff;
  opacity: 1;
}
</style>
