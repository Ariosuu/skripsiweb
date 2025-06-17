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
          <h2 class="text-center mb-6" style="color: #dcdcdd">Log In</h2>

          <v-text-field
            v-model="email"
            label="Email"
            variant="solo"
            color="#46494C"
            class="mb-4 px-7"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="solo"
            color="#46494C"
            class="mb-6 px-7"
          />
          <v-btn
            block
            color="#1694CF"
            style="color: #fff"
            class="mb-4"
            @click="handleSubmit"
          >
            Log In
          </v-btn>

          <div class="d-flex justify-center mb-4">
            <v-btn variant="text" to="/signup">Create an account</v-btn>
          </div>

          <div v-if="error">{{ error }}</div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useLogin from "@/composables/useLogin";

const isSignup = ref(false);
const email = ref("");
const password = ref("");

const router = useRouter();

const { login, error } = useLogin();
const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    router.push("home");
  }
};
</script>
