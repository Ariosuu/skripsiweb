<script setup>
  import SideBar from "./components/SideBar.vue"
</script>

<template>
  <v-app>
    <SideBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

