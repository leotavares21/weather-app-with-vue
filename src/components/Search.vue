<script setup>
import { Icon } from "@iconify/vue";
</script>

<script>
import { useWeatherStore } from "../store/weather";

export default {
  data() {
    return {
      store: useWeatherStore(),
      searchTerm: "",
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      if (!this.$refs.componentToClose.contains(event.target)) {
        this.store.clearSearch();
      }
    },
    handleSearch() {
      this.store.getSearchData(this.searchTerm);
      this.searchTerm = "";
    },
  },
};
</script>

<template>
  <div @click="handleClickOutside" class="search-container">
    <form action="submit" @submit.prevent="handleSearch()">
      <Icon icon="ic:round-search" class="icon" />
      <input
        type="search"
        v-model="searchTerm"
        placeholder="Busque por cidades"
      />
    </form>

    <ul
      class="search-list"
      :class="{ isShowed: store.searchData.length > 0 && store.searchIsOpen }"
      ref="componentToClose"
    >
      <div v-if="!store.weatherCurrent.isLoaded" class="loader">
        Carregando...
      </div>
      <li v-for="search in store.searchData" :key="search.id">
        <div
          class="item-content"
          @click="store.getWeatherCurrent(search.lat, search.lon)"
        >
          <p class="region">{{ search.region }}</p>

          <div class="city">
            <p>{{ search.name }}</p>
            <span>{{ search.country }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  position: relative;

  .loader {
    text-align: center;
    position: sticky;
    top: 0rem;

    z-index: 10;
  }

  form {
    display: flex;
    align-items: center;
    position: relative;

    .icon {
      position: absolute;
      left: 4%;
      color: var(--heading);
    }

    input[type="search"] {
      margin: 1rem 0;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
      border-radius: 10px;
      border: 1px solid var(--dark);
      background: #1c1b33;

      &::placeholder {
        color: var(--heading);
        font-size: 1rem;
        font-weight: 100;
        letter-spacing: 2px;
      }
    }
  }
  .search-list {
    background: rgba(0, 0, 0, 0.8);

    overflow-y: scroll;

    width: 100vw;
    max-width: 30rem;
    height: 80vh;
    z-index: 100;

    display: none;

    padding: 2rem;
    border-radius: 1rem;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 550px) {
      width: 90vw;
      padding: 1rem;
    }

    &.isShowed {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary);
      border-radius: 1rem;
    }

    li {
      background-image: url(@/assets/images/Rectangle.svg);
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      width: 100%;
      height: 12rem;
      margin-bottom: 3rem;
      border-radius: 1rem;
      cursor: pointer;

      @media (max-width: 460px) {
        height: 10rem;
      }

      @media (max-width: 410px) {
        height: 9rem;
      }

      @media (max-width: 360px) {
        height: 8rem;
      }
    }
    .item-content {
      display: flex;
      flex-direction: column;
      padding: 5rem 1.5rem 0;

      @media (max-width: 460px) {
        padding: 3rem 1.5rem 0;
      }

      @media (max-width: 360px) {
        padding: 2rem 1rem 0;
      }

      .region {
        margin-right: 1rem;
        font-size: 1rem;
        color: var(--heading);
      }

      .city {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        span {
          font-size: 1rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
