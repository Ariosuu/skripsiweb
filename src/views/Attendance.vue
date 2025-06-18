<template>
  <v-card max-height="800" class="pa-4 ml-5 mr-5 mt-5" no-gutters>
    <v-card color="#D9D9D9" class="pa-4" no-gutters>
      <v-col cols="12">
        <v-row align="center">
          <v-col cols="1">
            <v-avatar color="surface-variant" size="x-large"> </v-avatar>
          </v-col>
          <v-col cols="9">
            <v-card-title>{{ userName }}</v-card-title>
            <v-card-subtitle>{{ userPos }}</v-card-subtitle>
          </v-col>
          <v-tooltip
            text="You have already clocked in today"
            location="top"
            :disabled="displayClockInMessage === '-'"
          >
            <template v-slot:activator="{ props }">
              <v-col cols="1" v-bind="props">
                <v-btn
                  variant="text"
                  block
                  base-color="#46494C"
                  @click="clockIn"
                  :disabled="displayClockInMessage !== '-'"
                >
                  <v-icon
                    color="#1985A1"
                    slot="prepend-icon"
                    :icon="mdiLoginVariant"
                    :size="30"
                  />
                  <div class="pa-2 font-weight-medium" slot="default">
                    CLOCK IN
                  </div>
                </v-btn>
              </v-col>
            </template>
          </v-tooltip>
          <v-tooltip
            text="You have already clocked in today"
            location="top"
            :disabled="displayClockInMessage === '-'"
          >
            <template v-slot:activator="{ props }">
              <v-col cols="1" v-bind="props">
                <v-btn
                  variant="text"
                  block
                  base-color="#46494C"
                  :disabled="displayClockOutMessage !== '-'"
                >
                  <v-icon
                    color="#1985A1"
                    slot="prepend-icon"
                    :icon="mdiLoginVariant"
                    :size="30"
                  />
                  <div
                    class="pa-2 font-weight-medium"
                    slot="default"
                    @click="clockOut"
                  >
                    CLOCK OUT
                  </div>
                </v-btn>
              </v-col>
            </template>
          </v-tooltip>
        </v-row>
      </v-col>
    </v-card>

    <h3 class="text-h6 ml-2 mt-4">Attendance Log</h3>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="[...attendanceRecords, ...newAttendance]"
          hide-default-footer
          class="px-4"
          height="600"
          items-per-page="-1"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";

const userName = ref();
const userPos = ref();
const auth = getAuth();
const userRef = collection(db, "employees");
const ID = ref();
const newAttendance = ref([]);
const attendanceRecords = ref([]);
const lastCheck = ref();
const currentDate = ref(new Date());
const checkDate = ref();
const displayClockInMessage = ref();
const displayClockOutMessage = ref();

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
        userName.value = currentUser.firstName + " " + currentUser.lastName;
        userPos.value = currentUser.jobTitle;
        ID.value = currentUser.id;
        lastCheck.value = currentUser.lastCheck;

        getDocs(collection(db, "employees", ID.value, "attendance")).then(
          (snapshot) => {
            let docs = [];
            snapshot.docs.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            attendanceRecords.value = docs;
          }
        );
      } else {
        console.error("User not found in the database.");
      }
    });
  }
});

const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const clockIn = async () => {
  const alreadyClockedIn = await verification();
  if (alreadyClockedIn) {
    console.log("You have already clocked in today.");
    return;
  } else {
    const now = new Date();
    const time = formatTime(now);
    const hour = now.getHours();
    const minutes = now.getMinutes();

    const timeDecimal = hour + minutes / 60;
    const status = timeDecimal > 9 ? "Late" : "On Time";

    newAttendance.value.push({
      date: formatDate(),
      clockedIn: time,
      clockedOut: "-",
      status,
    });
    recordData();
  }
};

const verification = async () => {
  if (!ID.value) return false;
  const attendanceRef = collection(db, "employees", ID.value, "attendance");
  const q = query(attendanceRef, where("date", "==", formatDate()));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

const clockOut = async () => {
  if (newAttendance.value.length > 0) {
    const lastRecord = newAttendance.value[newAttendance.value.length - 1];
    if (lastRecord.clockedOut === "-") {
      lastRecord.clockedOut = formatTime(new Date());
    }
  }
  try {
    if (lastCheck.value) {
      const docRef = doc(
        db,
        "employees",
        ID.value,
        "attendance",
        lastCheck.value
      );
      await updateDoc(docRef, {
        clockedOut: formatTime(new Date()),
      });
      console.log("Clocked out successfully!");
    } else {
      console.log("No lastCheck record found.");
    }
  } catch (error) {
    console.error("Error clocking out:", error);
    window.refresh();
  }
};

const recordData = () => {
  const lastRecord = newAttendance.value[newAttendance.value.length - 1];
  addDoc(collection(db, "employees", ID.value, "attendance"), {
    date: lastRecord.date,
    clockedIn: lastRecord.clockedIn,
    clockedOut: lastRecord.clockedOut,
    status: lastRecord.status,
  }).then(async (docRef) => {
    lastCheck.value = docRef.id;
    updateDoc(doc(db, "employees", ID.value), {
      lastCheck: lastCheck.value,
    });
    const attendanceDoc = await getDoc(
      doc(db, "employees", ID.value, "attendance", docRef.id)
    );
    if (attendanceDoc.exists()) {
      displayClockInMessage.value = attendanceDoc.data().clockedIn;
    }
  });
};

const headers = ref([
  { title: "Date", key: "date", align: "start" },
  { title: "Clocked In", key: "clockedIn", align: "start", sortable: false },
  { title: "Clocked Out", key: "clockedOut", align: "start", sortable: false },
  { title: "Status", key: "status", align: "start", sortable: false },
]);

onMounted(async () => {
  checkDate.value = new Date().toLocaleDateString("en-US");
  currentDate.value = new Date(); // Buat ngeset date ke hari ini tiap kali mounted

  // Wait until id.value is set before querying attendance
  const waitForId = async () => {
    while (!ID.value) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const attendanceRef = collection(db, "employees", ID.value, "attendance");
    const q = query(attendanceRef, where("date", "==", formatDate()));
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        displayClockInMessage.value = docData.clockedIn;
        displayClockOutMessage.value = docData.clockedOut;
      } else {
        displayClockInMessage.value = "-";
        displayClockOutMessage.value = "-";
      }
    });
    console.log("Current date set to:", checkDate.value);
  };

  waitForId();
});
</script>
