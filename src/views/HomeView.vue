<script setup>
import Weather from "../components/Weather.vue";
import Hour from "../components/Hour.vue";
import WeatherStats from "../components/WeatherInfo.vue";
import { useWeatherStore } from "../store/weather";

import { onMounted } from "vue";

const store = useWeatherStore();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    modalMsg = "Geolocalização não é suportada nesse navegador!";
  }
}

function showPosition(position) {
  store.getWeatherCurrent(position.coords.latitude, position.coords.longitude);
}

onMounted(() => {
  getLocation();
});
</script>

<template>
  <div class="wrapper" v-if="store.weatherCurrent.isLoaded">
    <main class="container">
      <Weather :data="store.weatherCurrent" />
    </main>
    <div class="container weather-infos">
      <Hour :forecast="store.weatherCurrent.forecast" />
      <WeatherStats :info="store.weatherCurrent.extra_info" />
    </div>
  </div>
  <div v-else class="loader"></div>
</template>

<style lang="scss">
.wrapper {
  position: relative;
}

.loader {
  margin: 40vh auto;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;

  border: 4px solid var(--heading);
  border-bottom-color: var(--warning);

  animation: spin 0.5s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.weather-infos {
  position: relative;
  top: -10rem;
  width: 100%;

  background: rgba(72, 49, 157, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid var(--primary);
  filter: blur(0.7);
  border-radius: 2rem;
  padding: 1rem;
}
</style>
