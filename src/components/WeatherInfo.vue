<script setup>
import { Icon } from "@iconify/vue";
</script>

<script>
import { useWeatherStore } from "../store/weather";
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      suntime: 0,
      uv: 0,
      air: 0,
      isActive: false,
      store: useWeatherStore(),
    };
  },
  mounted() {
    this.updateHour();
    setInterval(this.updateHour, 1000);
    this.handleUV();
    this.handleAir();
  },
  methods: {
    updateHour() {
      const data = new Date();
      const hora = data.getHours();
      const minutos = data.getMinutes();
      this.suntime = ((hora * 60 + minutos) / 1440) * 100;
    },
    handleUV() {
      const uv = this.store.weatherCurrent.extra_info.uv;

      const newUV = Number(uv.slice(0, 2) * 10 - 10);

      if (newUV > 110) {
        this.uv = 100;
      } else if (newUV === 0) {
        this.uv = 0;
      } else {
        this.uv = newUV;
      }
    },
    handleAir() {
      const air = this.store.weatherCurrent.extra_info.air_quality.air_index;

      const newAir = Number(air.slice(0, 2) * 10 - 10);

      if (newAir > 100) {
        this.air = 100;
      } else if (newAir === 0) {
        this.air = 0;
      } else {
        this.air = newAir;
      }
    },
    toggleSeeMore() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<template>
  <div class="container-info">
    <div class="info-card card-short" id="sunHour">
      <strong class="title-info"
        ><Icon icon="solar:sunrise-bold" class="icon" /> nascer do sol</strong
      >
      <p class="main-info">
        {{ info.sunrise }}
      </p>

      <div class="chart-line" id="sunTime">
        <div class="line-sun">
          <div class="circle-sun" :style="{ left: suntime + '%' }"></div>
        </div>
      </div>

      <p class="text-info">Pôr do sol: {{ info.sunset }}</p>
    </div>

    <div class="info-card card-short" id="uvIndex">
      <strong class="title-info"
        ><Icon icon="ic:baseline-wb-sunny" class="icon" /> Índice UV</strong
      >
      <p class="main-info">
        {{ info.uv }}
      </p>

      <div class="line-uv">
        <div class="circle-uv" :style="{ left: uv + '%' }"></div>
      </div>
    </div>

    <div class="info-card card-short" id="rainfall">
      <strong class="title-info"
        ><Icon icon="mdi:water" class="icon" /> Chuva</strong
      >
      <p class="main-info">
        {{ info.precip_mm }} mm <span>na última hora</span>
      </p>
      <p class="text-info">{{ info.precip_in }} mm esperados em 24 horas</p>
    </div>

    <div class="info-card card-short" id="wind">
      <strong class="title-info"
        ><Icon icon="mdi:weather-windy" class="icon" /> Vento</strong
      >
      <div id="compass">
        <div
          class="arrow"
          :style="{
            transform:
              'translate(-50%, -50%)  rotate(90deg) rotate(' +
              info.wind_degree +
              'deg)',
          }"
        ></div>

        <p class="main-info">{{ info.wind_kph }} km/h</p>
      </div>
    </div>

    <div class="info-card" id="airQuality">
      <strong class="title-info"
        ><Icon icon="ic:baseline-blur-on" class="icon" /> Qualidade do
        ar</strong
      >
      <p class="main-info">
        {{ info.air_quality.air_index }}
      </p>
      <div class="line-air">
        <div class="circle-air" :style="{ left: air + '%' }"></div>
      </div>
      <p class="extra-info">
        <span>Ver mais</span
        ><Icon
          icon="material-symbols:arrow-forward-ios-rounded"
          class="icon-extra"
          :class="{ isActive: isActive }"
          @click="toggleSeeMore()"
        />
      </p>
      <ul class="tooltip" :class="{ isActive: isActive }">
        <strong>Principais poluentes</strong>
        <li>
          <span>co:</span> <span>{{ info.air_quality.co }}</span>
        </li>
        <li>
          <span>no2:</span> <span>{{ info.air_quality.no2 }}</span>
        </li>
        <li>
          <span>o3:</span> <span>{{ info.air_quality.o3 }}</span>
        </li>
        <li>
          <span>so2:</span> <span>{{ info.air_quality.so2 }}</span>
        </li>
        <li>
          <span>pm2_5:</span> <span>{{ info.air_quality.pm2_5 }}</span>
        </li>
        <li>
          <span>pm10:</span> <span>{{ info.air_quality.pm10 }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 960px) {
    justify-content: center;
  }

  .info-card {
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid var(--primary);
    background: rgba(25, 23, 57, 0.8);

    .title-info {
      color: var(--heading);
      text-transform: uppercase;
      font-weight: 400;
      display: flex;
      align-items: center;

      font-size: 1rem;
      margin-bottom: 0.5rem;

      .icon {
        font-size: 1.25rem;
        margin-right: 0.35rem;
      }
    }

    .main-info {
      margin: 1rem 0;
      font-size: 2rem;

      span {
        display: block;
        font-size: 1.25rem;
      }
    }

    .text-info {
      font-size: 1rem;
      font-weight: 100;
      letter-spacing: 1px;
    }

    &.card-short {
      width: 13.7rem;
    }
    .chart-line {
      position: relative;
    }
  }

  #sunTime {
    background-image: url(@/assets/images/line.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
    width: 100%;
    height: 40px;
    margin-bottom: 1rem;
  }
  .line-sun {
    width: 100%;
    height: 1px;
    background-color: #999;
    position: absolute;
    top: 50%;
  }

  .circle-sun {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d6cdff;
    box-shadow: 0px 0px 7px 1px #d6cdff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  .line-uv,
  .line-air {
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, var(--primary), var(--warning));

    margin: 2rem 0 1rem 0;
    position: relative;
  }

  .circle-uv,
  .circle-air {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid var(--dark);
    background: var(--light);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  #wind #compass {
    background-image: url(@/assets/images/compass.png);
    background-repeat: no-repeat;
    background-size: 8.5rem 100%;
    background-position: center;
    width: 100%;
    height: 8.5rem;

    position: relative;

    .arrow {
      background-image: url(@/assets/images/arrow.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 8.5rem;
      height: 17px;

      position: absolute;
      left: 49%;
      top: 51%;
      transform-box: fill-box;
    }

    .main-info {
      font-size: 1.5rem;
      margin: 0;
      width: 50px;
      text-align: center;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  #airQuality {
    position: relative;
    .main-info {
      text-transform: capitalize;
    }

    .extra-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-weight: 100;
      }

      .icon-extra {
        cursor: pointer;
        color: var(--heading);

        transition: transform 0.2s ease-in;
        font-size: 1rem;

        &.isActive {
          transform: rotate(90deg);
        }
      }
    }

    .tooltip {
      padding: 1rem;
      border-radius: 1rem;
      background: rgba(0, 0, 0, 0.7);

      position: absolute;
      right: 0%;
      top: 103%;
      min-width: 250px;

      z-index: -10;
      opacity: 0;

      transition: opacity 0.2s ease-in;

      strong {
        letter-spacing: 2px;
        text-transform: capitalize;
      }

      &.isActive {
        opacity: 1;
        z-index: 1;
      }

      li {
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
