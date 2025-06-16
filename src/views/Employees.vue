<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Employee List</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>
  <v-row>
    <v-col cols="3">
      <v-card-text>
        <v-text-field
          v-model="search"
          :loading="loading"
          :append-inner-icon="mdiMagnify"
          density="compact"
          label="Search Employees"
          variant="solo"
          hide-details
          single-line
          flat
          @click:append-inner="onClick"
        >
        </v-text-field>
      </v-card-text>
    </v-col>

    <v-spacer />
    <v-col class="d-flex align-center justify-end pr-7">
      <v-btn flat color="#1985A1" @click="newEmployee"
        >Add New Employee</v-btn
      ></v-col
    >
  </v-row>

  <v-card max-height="750" class="ma-4 mt-0" color="#FFFFFF">
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      class="px-4"
      height="750"
      hide-default-footer
      items-per-page="-1"
    >
      <template v-slot:item.formattedDate="{ value }">
        {{ value }}
      </template>

      <template v-slot:item.empStatus="{ value }">
        <v-chip :color="chipColor(value)">{{ value }}</v-chip>
      </template>

      <template v-slot:item.view="{ item }">
        <v-tooltip text="View Employee Profile">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              size="sm"
              :to="{
                name: 'Employee Profile',
                query: {
                  id: item.id,
                  fullName: item.fullName,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  jobDivision: item.jobDivision,
                  jobTitle: item.jobTitle,
                  status: item.empStatus,
                  dateOfBirth: item.formattedDate,
                  phoneNumber: item.phoneNumber,
                  email: item.email,
                },
              }"
            >
              <v-icon :icon="mdiEye" color="#1985A1" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="employeeDialog" width="auto" persistent>
    <v-form @submit.prevent="confirmEmployee" v-model="isValid">
      <v-card width="800" title="New Employee">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>

        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="6" class="pb-0">
              <v-text-field
                label="First Name"
                v-model="employeeForm.firstName"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                label="Last Name"
                v-model="employeeForm.lastName"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="pt-1 pb-0">
              <v-date-input
                label="Date of Birth"
                v-model="employeeForm.dateOfBirth"
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
                v-model="employeeForm.phone"
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
                v-model="employeeForm.email"
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
                v-model="employeeForm.division"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-text-field
                label="Job Title"
                v-model="employeeForm.jobTitle"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('Cannot be Empty')]"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pt-1 pb-0">
              <v-select
                label="Status"
                v-model="employeeForm.status"
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
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
  mdiMagnify,
  mdiEyeOutline,
  mdiEye,
  mdiClose,
} from "@mdi/js";

import { ref, watch, computed, reactive } from "vue";
import { db } from "@/firebase/config";
import { Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";
import getCollection from "@/composables/getCollection";
import { VDateInput } from "vuetify/labs/VDateInput";
import { useRules } from "vuetify/labs/rules";

const loaded = ref(false);
const loading = ref(false);
const search = ref("");
const employeeDialog = ref(false);
const isValid = ref(false);
const rules = useRules();
const auth = getAuth();
const { documents: items } = getCollection("employees");

const employeeForm = reactive({
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  phone: "",
  email: "",
  jobTitle: "",
  division: "",
  status: "Active",
});

watch(
  items,
  (newItems) => {
    if (newItems) {
      newItems.forEach((item) => {
        if (item.dateofBirth instanceof Timestamp) {
          item.formattedDate = item.dateofBirth
            .toDate()
            .toLocaleDateString("en-US");
        } else {
          item.formattedDate = "N/A";
        }
      });
    }
  },
  { immediate: true }
);

watch(
  items,
  (newItems) => {
    if (newItems) {
      newItems.forEach((item) => {
        if (item.firstName && item.lastName) {
          item.fullName = item.firstName + " " + item.lastName;
        } else {
          item.fullName = item.firstName || item.lastName || "N/A";
        }
      });
    }
  },
  { immediate: true }
);

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  const searchTerm = search.value.toLowerCase();
  return items.value.filter((item) => {
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm);
      }
      return false;
    });
  });
});

const headers = ref([
  { title: "Name", key: "fullName", align: "start", width: 320 },
  { title: "Division", key: "jobDivision", align: "start" },
  { title: "Position", key: "jobTitle", align: "start" },
  { title: "Date Of Birth", key: "formattedDate", align: "center" },
  { title: "Contact Number", key: "phoneNumber", align: "start", width: 200 },
  { title: "Status", key: "empStatus", align: "center", sortable: false },
  { title: "", key: "view", align: "center", sortable: false },
]);

const newEmployee = () => {
  employeeDialog.value = true;
};

const closeDialog = () => {
  employeeDialog.value = false;
};

const confirmEmployee = () => {
  if (isValid.value) {
    closeDialog();
  }
};

const chipColor = (x) => {
  if (x == "Active") {
    return "green";
  } else if (x == "Inactive") {
    return "red";
  }
};

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
}
</script>
