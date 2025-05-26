<script setup>
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <v-app>
    <SideBar />
    <v-main style="background-color: #dcdcdc; min-height: 100%">
      <router-view />
    </v-main>
  </v-app>
</template>
