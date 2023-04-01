<script setup>
import imgHouse from "../assets/images/house.png";
import Search from "../components/Search.vue";
</script>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<template>
  <div class="container-weather">
    <Search />
    <div class="weather">
      <h1>
        {{ data.location.name }},
        {{ data.location.region }}
      </h1>
      <div class="degree">{{ data.current.temp_c }}°c</div>

      <p class="condition">{{ data.current.condition }}</p>

      <div class="max-and-min">
        <p>Max: {{ data.current.maxtemp_c }}°c</p>
        <p>Min: {{ data.current.mintemp_c }}°c</p>
      </div>
    </div>

    <img :src="imgHouse" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.container-weather {
  display: flex;
  flex-direction: column;
  align-items: center;

  .weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    min-height: 300px;

    @media (max-width: 830px) {
      h1 {
        font-size: 2rem;
      }

      .degree {
        font-size: 5rem;
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 1.5rem;
      }

      .degree {
        font-size: 4rem;
      }
    }
  }

  .degree {
    font-size: 7rem;
    font-weight: 100;
  }

  .condition {
    color: var(--heading);
    margin-bottom: 0.5rem;
  }

  .max-and-min {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  img {
    max-width: 100vw;
  }
}
</style>
