<script setup>
import { useWeatherStore } from "../store/weather";
const store = useWeatherStore();
</script>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
export default {
  props: {
    forecast: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      weather_type: "hour",
    };
  },
  computed: {
    firstItem() {
      return this.forecast.filter((item, index) => index === 0)[0];
    },
  },
  methods: {
    handleWeatherType(type) {
      this.weather_type = type;
    },
  },
};
</script>

<template>
  <div class="container-hour">
    <div class="weather-types">
      <button @click="handleWeatherType('hour')">por hora</button>
      <button @click="handleWeatherType('day')">por dia</button>
      <div class="line-bar">
        <div class="bar" :class="{ isDay: weather_type === 'day' }"></div>
      </div>
    </div>

    <!-- climate in hours  -->
    <div class="container-list">
      <swiper
        :modules="modules"
        :slides-per-view="3.4"
        :space-between="20"
        :scrollbar="{ draggable: true }"
        :breakpoints="{
          '320': {
            slidesPerView: 4.4,
            spaceBetween: 20,
          },
          '500': {
            slidesPerView: 5.4,
            spaceBetween: 20,
          },
          '600': {
            slidesPerView: 6.4,
            spaceBetween: 20,
          },
          '830': {
            slidesPerView: 7.4,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 8.4,
            spaceBetween: 30,
          },
        }"
        class="weather-list"
        v-if="firstItem"
        :class="{ isShowed: weather_type === 'hour' }"
      >
        <swiper-slide
          v-for="(hour, index) in firstItem.hours"
          :key="index"
          class="weather"
          :class="{ isActive: index === 0 }"
        >
          <p>{{ hour.time }}</p>
          <img :src="hour.condition.icon" alt="" />
          <span>{{ hour.temp_c }}°c</span>
        </swiper-slide>
      </swiper>

      <!-- climate in days -->
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :scrollbar="{ draggable: true }"
        :breakpoints="{
          '320': {
            slidesPerView: 4.4,
            spaceBetween: 20,
          },
          '500': {
            slidesPerView: 5.4,
            spaceBetween: 20,
          },
          '600': {
            slidesPerView: 6.4,
            spaceBetween: 20,
          },
          '830': {
            slidesPerView: 7.4,
            spaceBetween: 20,
          },
          '1024': {
            slidesPerView: 8.4,
            spaceBetween: 30,
          },
        }"
        class="weather-list"
        v-if="firstItem"
        :class="{ isShowed: weather_type === 'day' }"
      >
        <swiper-slide
          v-for="(weather, index) in forecast"
          :key="index"
          class="weather"
          :class="{ isActive: index === 0, isLessThanEight: index < 8 }"
        >
          <p>{{ weather.date }}</p>
          <img :src="weather.days.condition.icon" alt="icon" />
          <span>{{ weather.days.maxtemp_c }}°c</span>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-hour {
  .loader {
    min-height: 200px;

    span {
      display: block;
      padding-top: 2rem;
      padding-left: 2rem;
    }
  }
  .weather-types {
    display: flex;
    justify-content: center;
    padding-bottom: 0.5rem;
    position: relative;

    button {
      margin: 0 1rem;
      background: transparent;
      color: var(--heading);
      text-transform: capitalize;
      font-size: 0.9rem;
      transition: 0.2s filter ease;

      &:hover {
        filter: brightness(0.8);
      }
    }

    .line-bar {
      width: 12rem;
      height: 1.5px;

      background: linear-gradient(
        to right,
        transparent,
        rgba(246, 214, 255, 0.4),
        transparent
      );

      position: absolute;
      bottom: 0;

      .bar {
        background: linear-gradient(
          to right,
          transparent,
          var(--secondary),
          transparent
        );
        padding: 0.75px;
        position: absolute;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.2s ease-in;

        &.isDay {
          transform: translateX(100%);
        }
      }
    }
  }

  .container-list {
    position: relative;
    margin: 2rem 0;
    min-height: 200px;

    .weather-list {
      margin-bottom: 2rem;
      max-width: 100%;
      opacity: 0;
      transition: opacity 1s ease-in;

      position: absolute;
      z-index: -1;

      user-select: none;

      &.isShowed {
        opacity: 1;
        z-index: 1;
      }

      .weather {
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 3rem;

        cursor: grab;

        border-left-color: var(--border-badge);
        border-top-color: var(--border-badge);
        border-right-color: var(--heading);
        border-bottom-color: var(--heading);
        border-style: solid;
        border-width: 2px;
        border-radius: 3rem;
        padding: 1rem;
        transition: all 0.3s ease;

        &:hover,
        &.isActive {
          background: var(--primary);
          border-left-color: var(--highlight);
          border-top-color: var(--highlight);
          border-right-color: var(--border-badge);
          border-bottom-color: var(--border-badge);
        }

        box-shadow: 5px 4px 10px 0 rgba(0, 0, 0, 0.25);

        background: rgba(72, 49, 157, 0.2);

        &.isLessThanEight {
          min-width: 5rem;

          @media (max-width: 335px) {
            min-width: 4rem;
          }
        }

        @media (max-width: 550px) {
          img {
            max-width: 3rem;
          }
        }

        @media (max-width: 390px) {
          img {
            max-width: 2.5rem;
          }

          span {
            font-size: 1rem;
          }
        }

        &.isCurrent {
          background: var(--primary);
        }

        p {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
