<script setup>
import { useRoute } from "vue-router";
import SideBar from "./components/SideBar.vue";

const route = useRoute();
</script>

<template>
  <v-app>
    <SideBar v-if="route.name !== 'Login'" />
    <v-main style="background-color: #dcdcdc; min-height: 100%">
      <router-view />
    </v-main>
  </v-app>
</template>
