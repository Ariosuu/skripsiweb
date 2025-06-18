<template>
  <!-- <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Home</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant">
      <span class="text-subtitle-1">
        {{ firstName ? firstName[0] : "" }}{{ lastName ? lastName[0] : "" }}
      </span>
    </v-avatar>
    <v-btn :icon="mdiLogout" @click="handleLogout" to="/login"> </v-btn>
  </v-app-bar> -->

  <v-container fluid class="pa-0">
    <!-- blue bar -->
    <v-sheet
      color="#207a9a"
      class="d-flex align-center pa-4 pl-10"
      height="170"
    >
      <v-avatar
        size="100"
        class="mr-4"
        color="surface-variant"
        style="border-radius: 16px"
      >
        <span class="text-h4">
          {{ firstName ? firstName[0] : "" }}{{ lastName ? lastName[0] : "" }}
        </span>
      </v-avatar>
      <div class="white--text">
        <div class="text-h6 font-weight-bold">Welcome back,</div>
        <div class="text-h5 font-weight-bold">{{ userName }}</div>
        <v-btn
          color="#DCDCDD"
          text
          class="py-1 mt-2"
          style="color: black; text-transform: none"
          :to="{
            name: 'Employee Profile',
            query: {
              id: id,
              fullName: userName,
              firstName: firstName,
              lastName: lastName,
              jobDivision: jobDivision,
              jobTitle: jobTitle,
              status: empStatus,
              email: email,
              phoneNumber: phoneNumber,
              dateOfBirth: formattedBirth,
            },
          }"
        >
          Staff Data
        </v-btn>
      </div>
    </v-sheet>

    <!-- CONTENT -->

    <v-row class="pa-4" dense>
      <v-col cols="8" class="pa-2">
        <v-card class="d-flex align-center justify-center fill-height">
          <v-carousel height="150" hide-delimiters cycle show-arrows="hover">
            <v-carousel-item
              v-for="(item, i) in img"
              :key="i"
              :src="item.src"
              @click="redirect(item.link)"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="4" class="pa-2">
        <v-card class="pa-4 h-auto">
          <v-row no-gutters>
            <v-tooltip
              text="You have already checked in today"
              location="top"
              :disabled="displayClockInMessage === '-'"
            >
              <template v-slot:activator="{ props }">
                <v-col cols="6" v-bind="props">
                  <v-btn
                    variant="plain"
                    size="x-large"
                    block
                    base-color="#46494C"
                    :disabled="displayClockInMessage !== '-'"
                    @click="clockIn"
                  >
                    <v-icon
                      color="#1985A1"
                      slot="prepend-icon"
                      :icon="mdiLoginVariant"
                      :size="30"
                    />
                    <div class="pa-2 text-h5 font-weight-medium" slot="default">
                      CLOCK IN
                    </div>
                  </v-btn>
                </v-col>
              </template>
            </v-tooltip>
            <v-divider vertical />
            <v-tooltip
              text="You have already checked out today"
              location="top"
              :disabled="displayClockOutMessage === '-'"
            >
              <template v-slot:activator="{ props }">
                <v-col cols="6" v-bind="props">
                  <v-btn
                    variant="plain"
                    size="x-large"
                    block
                    @click="clockOut"
                    :disabled="displayClockOutMessage !== '-'"
                  >
                    <v-icon
                      color="#1985A1"
                      slot="prepend-icon"
                      :icon="mdiLogoutVariant"
                      :size="30"
                    />
                    <div class="pa-2 text-h5 font-weight-medium" slot="default">
                      CLOCK OUT
                    </div>
                  </v-btn>
                </v-col>
              </template>
            </v-tooltip>
          </v-row>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col cols="12" class="text-center">
              Clocked in at: <br />
              <strong class="text-h4">
                {{ displayClockInMessage ? displayClockInMessage : "-" }}
              </strong>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="8" class="pa-2">
        <v-card height="450" class="overflow-y-auto">
          <v-card-text>
            <v-date-picker width="100%" v-model="currentDate"></v-date-picker>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="4" class="pa-2">
        <v-col cols="12" class="pa-0">
          <v-card>
            <v-card-title class="text-center">
              Leave Remaining: {{ leaveRemaining }} days
            </v-card-title>
            <v-card-text>
              <v-btn to="/timeoff" size="large" color="#207a9a" block flat
                >Request Leave</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" class="pa-0 pt-4">
          <v-card>
            <v-card-title> UPCOMING TRAINING</v-card-title>
            <v-card-text>
              <v-sheet
                color="grey lighten-3"
                class="pa-4 d-flex justify-space-between align-center"
                rounded
              >
                <div>
                  {{ latestTrainingName }}<br />
                  <small>{{ formattedDate }} - {{ latestTrainingType }}</small>
                </div>
                <v-btn
                  :icon="mdiChevronRight"
                  size="small"
                  color="#207a9a"
                  @click="redirect(latestTrainingLink)"
                />
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
} from "@mdi/js";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { projectAuth } from "@/firebase/config";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
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
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useRoute } from "vue-router";
import { VCalendar } from "vuetify/labs/VCalendar";

const route = useRoute();
const auth = getAuth();
const userRef = collection(db, "employees");
const id = ref();
const leaveRemaining = ref();
const newAttendance = ref([]);
const attendanceRecords = ref([]);
const { user } = getUser();
const lastClockInTime = ref(null);
const reset = ref(false);
const items = ref([]);
const currentDate = ref(new Date());
const checkDate = ref();
const lastCheck = ref();
const displayClockInMessage = ref();
const displayClockOutMessage = ref();

const img = [
  {
    src: "https://img.freepik.com/free-vector/partners-signing-contract-online-people-talking-monitor-with-document-with-signatures-flat-vector-illustration_74855-10614.jpg",
    link: "https://www.kompas.com/",
  },
  {
    src: "https://img.freepik.com/premium-vector/breaking-news-information-banner-notifies-people-with-latest-news-banners-promotional-media_101434-770.jpg",
    link: "https://www.kompas.com/",
  },
];

// get user data
const userName = ref();
const firstName = ref();
const lastName = ref();
const jobTitle = ref();
const jobDivision = ref();
const empStatus = ref();
const email = ref();
const phoneNumber = ref();
const dateOfBirth = ref();

const formattedBirth = computed(() => {
  if (dateOfBirth.value instanceof Timestamp) {
    return dateOfBirth.value.toDate().toLocaleDateString("en-US");
  }
  return "N/A";
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
        userName.value = currentUser.firstName + " " + currentUser.lastName;
        firstName.value = currentUser.firstName;
        lastName.value = currentUser.lastName;
        jobTitle.value = currentUser.jobTitle;
        jobDivision.value = currentUser.jobDivision;
        empStatus.value = currentUser.empStatus;
        email.value = currentUser.email;
        phoneNumber.value = currentUser.phoneNumber;
        dateOfBirth.value = currentUser.dateofBirth;
        id.value = currentUser.id;
        leaveRemaining.value = currentUser.timeOff;
        lastCheck.value = currentUser.lastCheck;
      } else {
        console.error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
});

const handleLogout = () => {
  signOut(projectAuth);
};

// CLOCK IN LOGIC

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
  if (!id.value) return false;
  const attendanceRef = collection(db, "employees", id.value, "attendance");
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
        id.value,
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
  }
  window.location.reload();
};

const recordData = () => {
  const lastRecord = newAttendance.value[newAttendance.value.length - 1];
  addDoc(collection(db, "employees", id.value, "attendance"), {
    date: lastRecord.date,
    clockedIn: lastRecord.clockedIn,
    clockedOut: lastRecord.clockedOut,
    status: lastRecord.status,
  }).then(async (docRef) => {
    lastCheck.value = docRef.id;
    await updateDoc(doc(db, "employees", id.value), {
      lastCheck: lastCheck.value,
    });
    const attendanceDoc = await getDoc(
      doc(db, "employees", id.value, "attendance", docRef.id)
    );
    if (attendanceDoc.exists()) {
      displayClockInMessage.value = attendanceDoc.data().clockedIn;
    }
  });
};

// TRAINING CODE

const { documents: training } = getCollection("training");

const latestTrainingName = computed(() => {
  if (training.value && training.value.length > 0) {
    return training.value[0].trainingName || "";
  }
  return "";
});

const latestTrainingDate = computed(() => {
  if (training.value && training.value.length > 0) {
    return training.value[0].date || "";
  }
  return "";
});

const latestTrainingType = computed(() => {
  if (training.value && training.value.length > 0) {
    return training.value[0].type || "";
  }
  return "";
});

const latestTrainingLink = computed(() => {
  if (training.value && training.value.length > 0) {
    return training.value[0].link || "";
  }
  return "";
});

const redirect = (x) => {
  window.open(x);
};

const formattedDate = computed(() => {
  if (latestTrainingDate.value instanceof Timestamp) {
    return latestTrainingDate.value.toDate().toLocaleDateString("en-US");
  }
  return "N/A";
});

onMounted(async () => {
  checkDate.value = new Date().toLocaleDateString("en-US");
  currentDate.value = new Date(); // Buat ngeset date ke hari ini tiap kali mounted

  // Wait until id.value is set before querying attendance
  const waitForId = async () => {
    while (!id.value) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const attendanceRef = collection(db, "employees", id.value, "attendance");
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

<style scoped>
:deep(.v-picker-title) {
  display: none;
}

:deep(.v-date-picker-month__days) {
  pointer-events: none;
}
</style>
