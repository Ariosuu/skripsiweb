<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">{{ routeName }}</p>
    <v-spacer></v-spacer>
    <v-btn
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
      <v-avatar color="surface-variant">
        <span class="text-subtitle-1">
          {{ firstName ? firstName[0] : "" }}{{ lastName ? lastName[0] : "" }}
        </span>
      </v-avatar>
    </v-btn>
    <v-btn :icon="mdiLogout" @click="handleLogout" to="/login"> </v-btn>
  </v-app-bar>
</template>

<script setup>
import { mdiLogout } from "@mdi/js";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
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
import { VCalendar } from "vuetify/labs/VCalendar";

const auth = getAuth();
const userRef = collection(db, "employees");
const id = ref();
const attendanceRecords = ref([]);
const { user } = getUser();
const route = useRoute();
const routeName = ref(null);
const userName = ref();
const firstName = ref();
const lastName = ref();
const jobTitle = ref();
const jobDivision = ref();
const empStatus = ref();
const email = ref();
const phoneNumber = ref();
const dateOfBirth = ref();

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

const formattedBirth = computed(() => {
  if (dateOfBirth.value instanceof Timestamp) {
    return dateOfBirth.value.toDate().toLocaleDateString("en-US");
  }
  return "N/A";
});

watch(route, async (newRoute, oldRoute) => {
  routeName.value = newRoute.name;
});

const handleLogout = () => {
  signOut(projectAuth);
};

onMounted(() => {
  routeName.value = route.name;
});
</script>
