<script setup>
import ModalGeolocation from "./components/ModalGeolocation.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <ModalGeolocation />
    <RouterView />
  </div>
</template>
