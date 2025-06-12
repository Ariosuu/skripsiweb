<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Home</p>
    <v-spacer></v-spacer>
    <v-btn to="/signup">Sign Up</v-btn>
    <v-btn to="/login">Log In</v-btn>
    <v-avatar color="surface-variant"></v-avatar>
    <v-btn :icon="mdiLogout" @click="handleLogout" to="/login"> </v-btn>
  </v-app-bar>

  <v-container fluid class="pa-0">
    <!-- blue bar -->
    <v-sheet
      color="#207a9a"
      class="d-flex align-center pa-4 pl-10"
      height="200"
    >
      <v-avatar size="100" rounded="0" class="mr-4"> </v-avatar>
      <div class="white--text">
        <div class="text-h6 font-weight-bold">Welcome back,</div>
        <div class="text-h5 font-weight-bold">Sedan Hussein</div>
        <v-btn
          color="#DCDCDD"
          text
          class="py-1 mt-2"
          style="color: black; text-transform: none"
        >
          Staff Data
        </v-btn>
      </div>
    </v-sheet>

    <!-- CONTENT -->

    <v-row class="pa-4" dense>
      <!-- news -->
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-card height="300" class="d-flex align-center justify-center">
          NEWS
        </v-card>
      </v-col>

      <!-- calendar -->
      <v-col cols="12" sm="6" md="3" class="pa-2">
        <v-card height="300" class="d-flex align-center justify-center">
          CALENDAR
        </v-card>
      </v-col>

      <!-- clock in/out -->
      <v-col cols="12" md="6" class="pa-2">
        <v-row no-gutters class="fill-height">
          <v-col cols="12">
            <v-card class="pa-4 h-auto">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-btn
                    variant="plain"
                    size="x-large"
                    block
                    base-color="#46494C"
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
                <v-divider vertical />
                <v-col cols="6">
                  <v-btn variant="plain" size="x-large" block>
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
              </v-row>
              <v-divider class="my-2"></v-divider>
              <v-row>
                <v-col cols="12" class="text-center">
                  Clocked in at: <br />
                  <strong class="text-h4"> 08:00 AM</strong>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- LEAVE REMAINING -->
          <v-col cols="12">
            <v-card class="fill-height">
              <v-card-title class="text-center">
                Leave Remaining: XX Days
              </v-card-title>
              <v-card-text>
                <v-btn size="large" color="#207a9a" block flat
                  >Request Leave</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- OUTLOOK -->
      <v-col cols="12" sm="6" md="6" class="pa-2">
        <v-card>
          <v-card-title>OUTLOOK INBOX</v-card-title>
          <v-card-text>
            <v-sheet
              color="grey lighten-3"
              class="pa-4 d-flex justify-space-between align-center"
              rounded
            >
              <div>
                Skibidi Gyatt Rizz Pt 2 Announced<br />
                <a href="#" class="text--primary font-weight-bold"
                  >ABSOLUTE MUST ATTEND [CLICK HERE]</a
                >
              </div>
              <div class="text-right grey--text text--darken-1">
                Thurs<br />
                15:00
              </div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- upcoming training -->
      <v-col cols="12" sm="6" md="6" class="pa-2">
        <v-card>
          <v-card-title> UPCOMING TRAINING</v-card-title>
          <v-card-text>
            <v-sheet
              color="grey lighten-3"
              class="pa-4 d-flex justify-space-between align-center"
              rounded
            >
              <div>
                Public Speaking 101<br />
                <small>TGL/BLN/THN - ONLINE/OFFLINE</small>
              </div>
              <v-btn :icon="mdiChevronRight" size="small" color="#207a9a" />
            </v-sheet>
          </v-card-text>
        </v-card>
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

import { projectAuth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import getUser from "@/composables/getUser";

const { user } = getUser();

const handleLogout = () => {
  signOut(projectAuth);
};
</script>
