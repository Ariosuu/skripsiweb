<template>
  <div
    style="
      background-color: #1985a1;
      min-height: 100vh;
      min-width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
    "
  >
    <v-row align="center" justify="center" style="min-height: 100vh">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-6" color="#4C5C68" elevation="3">
          <h2 class="text-center mb-6" style="color: #dcdcdd">Welcome Back</h2>
          <h2 class="text-center mb-6" style="color: #dcdcdd">Login</h2>
          <v-text-field
            v-model="username"
            label="Username"
            variant="solo"
            color="#46494C"
            class="mb-4"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="solo"
            color="#46494C"
            class="mb-6"
          />
          <v-btn block color="#1694CF" style="color: #fff" size="large" to="/">
            Login
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
