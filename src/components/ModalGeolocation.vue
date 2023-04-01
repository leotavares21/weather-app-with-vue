<script setup>
import { onMounted } from "vue";
import { useGeolocation } from "@vueuse/core";
import { useWeatherStore } from "../store/weather";

const store = useWeatherStore();

const { isSupported } = useGeolocation();

const modalMsg =
  "Esta aplicação precisa de acesso à sua localização para funcionar corretamente.";

function closeModal() {
  if (!store.showModal) {
    return;
  }
  store.handleModal(false);
}

function handleModal() {
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
          store.handleModal(false);
        } else if (permissionStatus.state === "denied") {
          store.handleModal(true);
        } else {
          store.handleModal(true);
        }
      });
  } else {
    if (!isSupported.value) {
      modalMsg.value = "Essa navegação não suporta a geolocalização";
      store.handleModal(true);
    }
  }
}

onMounted(() => {
  handleModal();
});
</script>

<template>
  <div v-if="store.showModal">
    <div class="modal">
      <h2>Permitir localização</h2>
      <p>
        {{ modalMsg }}
      </p>
      <div class="buttons">
        <button class="close" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary);
  border: 1px solid black;
  padding: 20px;

  z-index: 100;

  p {
    margin: 2rem 0;
  }
}

.buttons {
  display: flex;
  justify-content: space-between;

  button {
    padding: 1rem;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
  .close {
    background: var(--warning);
  }
}
</style>
