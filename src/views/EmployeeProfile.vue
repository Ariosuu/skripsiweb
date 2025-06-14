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
                  <span class="text-h4"> Employee Name </span>
                  <br />
                  <span class="text-h6 font-weight-regular">
                    Division - Position</span
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
        <!-- NOT EDITING -->
        <v-col cols="2">
          <span>First Name</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.firstName }}</span
          >
        </v-col>
        <v-col cols="2">
          <span>Last Name</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.lastName }}
          </span>
        </v-col>
        <v-col cols="2">
          <span>Date of Birth</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.dateOfBirth.toLocaleDateString() }}
          </span>
        </v-col>
        <v-col cols="2">
          <span>Phone Number</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.phone }}
          </span>
        </v-col>
        <v-col cols="4">
          <span>Email</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.email }}
          </span>
        </v-col>
      </v-row>

      <v-row class="px-2">
        <v-col class="text-h6 font-weight-regular pb-2 pt-0" cols="12">
          Employment Detials
        </v-col>
        <v-divider />
        <!-- NOT EDITING -->
        <v-col cols="2">
          <span>Job Title </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.firstName }}</span
          >
        </v-col>
        <v-col cols="2">
          <span>Division </span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.lastName }}
          </span>
        </v-col>
        <v-col cols="4">
          <span>Employee Status</span>
          <br />
          <span class="text-subtitle-1 font-weight-medium">
            {{ profile.dateOfBirth.toLocaleDateString() }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { mdiLogout } from "@mdi/js";
import { ref } from "vue";

const profile = ref({
  firstName: "Daniel",
  lastName: "Garyo",
  dateOfBirth: new Date("2002-06-09"),
  phone: "0812325209",
  email: "ericgaryo@hotmail.com",
});
</script>
