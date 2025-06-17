<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">{{ routeName }}</p>
    <v-spacer></v-spacer>
    <v-avatar color="surface-variant">
      <span class="text-subtitle-1">
        {{ firstName ? firstName[0] : "" }}{{ lastName ? lastName[0] : "" }}
      </span>
    </v-avatar>
    <v-btn :icon="mdiLogout" @click="handleLogout" to="/login"> </v-btn>
  </v-app-bar>
</template>

<script setup>
import { mdiLogout } from "@mdi/js";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const routeName = ref(null);

watch(route, async (newRoute, oldRoute) => {
  routeName.value = newRoute.name;
});

const handleLogout = () => {
  signOut(projectAuth);
};

onMounted(() => {
  routeName.value = route.name;
});
</script>
