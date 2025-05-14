<template>
  <div style="background-color: #C5C3C6; min-height: 100vh;">
    <v-app-bar color="#C5C3C6" flat height="64">
      <p color ='#C5C3C6' class="text-h6 font-weight-bold pl-8">Home</p>
      <v-spacer></v-spacer>
      <v-avatar size="32">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User" />
      </v-avatar>
      <v-btn icon>
        <v-icon color='#46494C'>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid class="pa-0">
      <!-- Welcome Section -->
      <v-sheet color="#207a9a" class="d-flex align-center pa-4 pl-10" height="200">
        <v-avatar size="100" rounded='0' class="mr-4">
          <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User" />
        </v-avatar>
        <div class="white--text">
          <div class="text-h6 font-weight-bold">Welcome back,</div>
          <div class="text-h5 font-weight-bold">Sedan Hussein</div>
          <v-btn color="#DCDCDD" text class="py-1 mt-2" style="color: black; text-transform: none;">
            Staff Data
          </v-btn>
        </div>
      </v-sheet>

      <!-- Main Grid -->
      <v-row class="pa-4" dense>
        <!-- News Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card height="380" class="d-flex align-center justify-center grey darken-3 white--text">
            NEWS
          </v-card>
        </v-col>

        <!-- Calendar Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card height="380" class="d-flex align-center justify-center grey darken-3 white--text">
            CALENDAR
          </v-card>
        </v-col>

        <!-- Clock In/Out Card -->
        <v-col cols="12" sm="6" md="6">
          <v-row dense class="fill-height" style="flex-direction: column">
            <v-col>
              <v-card class="pa-4 fill-height">
                <v-row align="center" class='py-5' justify="space-around" no-gutters>
                  <v-btn text class="d-flex align-center">
                    <v-icon left>mdi-login-variant</v-icon>
                    <span class="font-weight-bold">Clock In</span>
                  </v-btn>
                  <v-btn text class="d-flex align-center">
                    <v-icon left>mdi-logout-variant</v-icon>
                    <span class="font-weight-bold">Clock Out</span>
                  </v-btn>
                </v-row>
                <v-divider class="my-2"></v-divider>
                <div class="text-center">
                  Clocked in at: <strong>08:00 am</strong>
                </div>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="pa-4 d-flex flex-column justify-center fill-height">
                <div class="text-subtitle-1 font-weight-bold mb-8">Leave Remaining: xx Days</div>
                <v-btn color="#207a9a" dark small>Request Leave</v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Outlook Inbox Card -->
        <v-col cols="12" sm="6" md="6">
          <v-card class="pa-4 mt-4" height="120">
            <div class="text-subtitle-2 font-weight-bold mb-2">OUTLOOK INBOX</div>
            <v-sheet color="grey lighten-3" class="pa-2 d-flex justify-space-between align-center">
              <div>
                Skibidi Gyatt Rizz Pt 2 Announced<br />
                <a href="#" class="text--primary font-weight-bold">ABSOLUTE MUST ATTEND [CLICK HERE]</a>
              </div>
              <div class="text-right grey--text text--darken-1">
                Thurs<br />
                15:00
              </div>
            </v-sheet>
          </v-card>
        </v-col>

        <!-- Upcoming Training Card -->
        <v-col cols="12" sm="6" md="6">
          <v-card class="pa-4 mt-4" height="120">
            <div class="text-subtitle-2 font-weight-bold mb-2">UPCOMING TRAINING</div>
            <v-sheet color="grey lighten-3" class="pa-2 d-flex justify-space-between align-center">
              <div>
                Public Speaking 101<br />
                <small>TGL/BLN/THN - ONLINE/OFFLINE</small>
              </div>
              <v-btn icon color="#207a9a">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components

export default defineComponent({
  name: 'HomeView',

  components: {
  },
});
</script>

