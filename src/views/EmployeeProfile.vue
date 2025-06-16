<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">
      Employee Profile
    </p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant" size="small"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card max-height="800" class="ma-4">
    <v-card-text>
      <v-row class="d-flex align-center">
        <v-col class="pa-2 pl-4 text-h5">Profile</v-col>
        <v-spacer />
        <v-col class="pa-2 d-flex justify-end">
          <v-btn color="#777777" flat> Edit Profile</v-btn>
        </v-col>
      </v-row>

      <v-card color="#C5C3C6" class="mt-4">
        <v-card-text>
          <v-row>
            <v-col cols="2" class="d-flex justify-left">
              <v-avatar size="125" color="red" rounded="0"> </v-avatar>
            </v-col>
            <v-col class="d-flex align-center">
              <v-row>
                <v-col cols="12">
                  <span class="text-h4"> {{ fullName }} </span>
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
          <span>Job Title </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ jobTitle }}</span
          >
        </v-col>
        <v-col cols="2">
          <span>Division </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ jobDivision }}
          </span>
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
</template>

<script setup>
import { mdiLogout } from "@mdi/js";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const fullName = route.query.fullName;
const firstName = route.query.firstName;
const lastName = route.query.lastName;
const jobDivision = route.query.jobDivision;
const jobTitle = route.query.jobTitle;
const status = route.query.status;
const dateOfBirth = new Date(route.query.dateOfBirth);
const phoneNumber = route.query.phoneNumber;
const email = route.query.email;

const chipColor = (x) => {
  if (x == "Active") {
    return "green";
  } else if (x == "Inactive") {
    return "red";
  }
};
</script>
