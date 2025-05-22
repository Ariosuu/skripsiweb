<template>
  <div style="background-color: #c5c3c6; min-height: 100%">
    <v-app-bar color="#C5C3C6" flat height="64">
      <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Home</p>
      <v-spacer></v-spacer>
      <v-avatar size="32"> </v-avatar>
      <v-btn :icon="mdiLogout"> </v-btn>
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
            <v-col cols="12" class="pb-4">
              <v-card class="pa-4 fill-height">
                <v-row no-gutters>
                  <v-col cols="6" class="d-flex justify-center align-center">
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
                      <div
                        class="pa-2 text-h5 font-weight-medium"
                        slot="default"
                      >
                        CLOCK IN
                      </div>
                    </v-btn>
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="6" class="d-flex justify-center align-center">
                    <v-btn variant="flat" size="x-large" block>
                      <v-icon
                        color="#1985A1"
                        slot="prepend-icon"
                        :icon="mdiLogoutVariant"
                        :size="30"
                      />
                      <div
                        class="pa-2 text-h5 font-weight-medium"
                        slot="default"
                      >
                        CLOCK OUT
                      </div>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider class="my-2"></v-divider>
                <div class="text-center text-subtitle-1">
                  Clocked in at: <strong>08:00 am</strong>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card
                class="pa-4 d-flex flex-column justify-center fill-height"
              >
                <div class="text-subtitle-1 font-weight-bold mb-8">
                  Leave Remaining: xx Days
                </div>
                <v-btn color="#207a9a">Request Leave</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- outlook -->
        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-card class="pa-4">
            <div class="text-subtitle-2 font-weight-bold mb-2">
              OUTLOOK INBOX
            </div>
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
          </v-card>
        </v-col>

        <!-- upcoming training -->
        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-card class="pa-4">
            <div class="text-subtitle-2 font-weight-bold mb-2">
              UPCOMING TRAINING
            </div>
            <v-sheet
              color="grey lighten-3"
              class="pa-4 d-flex justify-space-between align-center"
              rounded
            >
              <div>
                Public Speaking 101<br />
                <small>TGL/BLN/THN - ONLINE/OFFLINE</small>
              </div>
              <v-btn :icon="mdiChevronRight" color="#207a9a" />
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {
  mdiChevronRight,
  mdiLoginVariant,
  mdiLogout,
  mdiLogoutVariant,
} from "@mdi/js";
</script>
