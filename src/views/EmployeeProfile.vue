<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">
      Employee Profile
    </p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small">
      <span class="text-h6"> {{ firstName[0] }}{{ lastName[0] }} </span>
    </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card max-height="800" class="ma-4">
    <v-card-text>
      <v-row class="d-flex align-center">
        <v-col class="pa-2 pl-4 text-h5">Profile</v-col>
        <v-spacer />
        <v-col class="pa-2 d-flex justify-end">
          <v-btn
            color="#777777"
            flat
            v-if="isHR === true || isHR === 'true'"
            @click="openEdit"
          >
            Edit Profile
          </v-btn>
        </v-col>
      </v-row>

      <v-card color="#C5C3C6" class="mt-4">
        <v-card-text>
          <v-row>
            <v-col cols="2" class="d-flex justify-left">
              <v-avatar size="125" rounded="0" color="surface-variant">
                <span class="text-h3">
                  {{ firstName[0] }}{{ lastName[0] }}
                </span>
              </v-avatar>
            </v-col>
            <v-col class="d-flex align-center">
              <v-row>
                <v-col cols="12">
                  <span class="text-h4"> {{ firstName }} {{ lastName }}</span>
                  <br />
                  <span class="text-h6 font-weight-regular">
                    {{ jobDivision }} - {{ jobTitle }}</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-row class="pt-4 px-2">
        <v-col class="text-h6 font-weight-regular pb-2" cols="12">
          Personal Information
        </v-col>
        <v-divider />
        <v-col cols="2">
          <span>First Name</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ firstName }}</span
          >
        </v-col>
        <v-col cols="2">
          <span>Last Name</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ lastName }}
          </span>
        </v-col>
        <v-col cols="2">
          <span>Date of Birth</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ dateOfBirth.toLocaleDateString() }}
          </span>
        </v-col>
        <v-col cols="2">
          <span>Phone Number</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ phoneNumber }}
          </span>
        </v-col>
        <v-col cols="4">
          <span>Email</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ email }}
          </span>
        </v-col>
      </v-row>

      <v-row class="px-2">
        <v-col class="text-h6 font-weight-regular pb-2 pt-0" cols="12">
          Employment Details
        </v-col>
        <v-divider />
        <v-col cols="2">
          <span>Division </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ jobDivision }}
          </span>
        </v-col>
        <v-col cols="2">
          <span>Job Title </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ jobTitle }}</span
          >
        </v-col>
        <v-col cols="4">
          <span>Employee Status</span>
          <br />
          <v-chip :color="chipColor(status)">
            {{ status }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-dialog v-model="editDialog" width="auto" persistent>
    <v-form @submit.prevent="confirmEdit" v-model="isValid">
      <v-card width="800" title="Edit Profile">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>

        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="6" class="pb-0">
              <v-text-field
                label="First Name"
                v-model="profileForm.firstName"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                label="Last Name"
                v-model="profileForm.lastName"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="pt-1 pb-0">
              <v-date-input
                label="Date of Birth"
                v-model="profileForm.dateOfBirth"
                variant="outlined"
                density="compact"
                width="auto"
                prepend-icon=""
                :append-inner-icon="mdiCalendar"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-date-input>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-text-field
                label="Phone Number"
                v-model="profileForm.phoneNumber"
                variant="outlined"
                density="compact"
                width="auto"
                :append-inner-icon="mdiPhone"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-1 pb-0">
              <v-text-field
                label="Email"
                v-model="profileForm.email"
                variant="outlined"
                density="compact"
                width="auto"
                :append-inner-icon="mdiAt"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-text-field
                label="Job Division"
                v-model="profileForm.jobDivision"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-text-field
                label="Job Title"
                v-model="profileForm.jobTitle"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-select
                label="Status"
                v-model="profileForm.status"
                :items="['Active', 'Inactive']"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" text="Save" color="#1985A1" variant="flat" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { mdiAt, mdiCalendar, mdiClose, mdiLogout, mdiPhone } from "@mdi/js";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useRules } from "vuetify/labs/rules";
import { VDateInput } from "vuetify/labs/VDateInput";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db, projectAuth } from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const route = useRoute();
const id = route.query.id;
const fullName = route.query.fullName;
const firstName = route.query.firstName;
const lastName = route.query.lastName;
const jobDivision = route.query.jobDivision;
const jobTitle = route.query.jobTitle;
const status = route.query.status;
const dateOfBirth = new Date(route.query.dateOfBirth);
const phoneNumber = route.query.phoneNumber;
const email = route.query.email;
const editDialog = ref(false);
const isValid = ref(false);
const rules = useRules();
const isHR = ref();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const docs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const currentUser = docs.find(
        (doc) => doc.uid === user.uid || doc.email === user.email
      );
      if (currentUser) {
        isHR.value = currentUser.isHR;

        await fetchLastClockIn();
      } else {
        console.error("User not found in the database.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
});
const profileForm = reactive({
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(""),
  phoneNumber: "",
  email: "",
  jobTitle: "",
  jobDivision: "",
  status: "Active",
});

const chipColor = (x) => {
  if (x == "Active") {
    return "green";
  } else if (x == "Inactive") {
    return "red";
  }
};

const openEdit = () => {
  profileForm.firstName = firstName;
  profileForm.lastName = lastName;
  profileForm.dateOfBirth = dateOfBirth;
  profileForm.phoneNumber = phoneNumber;
  profileForm.email = email;
  profileForm.jobTitle = jobTitle;
  profileForm.jobDivision = jobDivision;
  profileForm.status = status;

  editDialog.value = true;
};

const closeDialog = () => {
  editDialog.value = false;

  profileForm.firstName = "";
  profileForm.lastName = "";
  profileForm.dateOfBirth = "";
  profileForm.phoneNumber = "";
  profileForm.email = "";
  profileForm.jobTitle = "";
  profileForm.jobDivision = "";
  profileForm.status = "";
};

const confirmEdit = async () => {
  if (isValid.value) {
    await updateDoc(doc(db, "employees", route.query.id), {
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      dateofBirth: profileForm.dateOfBirth,
      phoneNumber: profileForm.phoneNumber,
      email: profileForm.email,
      jobTitle: profileForm.jobTitle,
      jobDivision: profileForm.jobDivision,
      empStatus: profileForm.status,
    });
    closeDialog();
    window.location.href = "/employees";
  }
};
</script>
