import { defineStore } from "pinia";
import { getTranslation } from "../services/translator";
import formatDate from "../utils/formatDate";
import formatHour from "../utils/formatHour";
import formatInfo from "../utils/formatInfo";
import api from "../services/api";

export const useWeatherStore = defineStore("weather", {
  state: () => {
    return {
      weatherCurrent: {
        isLoaded: false,
        location: {
          name: null,
          region: null,
        },
        current: {
          temp_c: null,
          condition: null,
          maxtemp_c: null,
          mintemp_c: null,
        },
        forecast: [
          {
            date: null,
            days: {
              maxtemp_c: null,
              condition: {
                icon: null,
              },
            },
            hours: [{ time: null, temp_c: null, condition: { icon: null } }],
          },
        ],
        extra_info: {
          sunrise: null,
          sunset: null,
          uv: null,
          precip_mm: null,
          wind_kph: null,
          wind_degree: null,
          air_quality: {
            co: null,
            no2: null,
            o3: null,
            so2: null,
            pm2_5: null,
            pm10: null,
            air_index: null,
          },
        },
      },

      searchData: [],
      searchIsOpen: false,
      showModal: false,
    };
  },
  actions: {
    async getWeatherCurrent(lat, lon) {
      try {
        const { data } = await api.getWeather(lat, lon);

        const currentHour = new Date().getHours();

        this.weatherCurrent.isLoaded = false;

        const newForecast = data.forecast.forecastday.map(
          (item, index, next) => {
            let hours;
            const date = formatDate(item.date);
            const days = {
              maxtemp_c: Math.round(item.day.maxtemp_c),
              mintemp_c: Math.round(item.day.mintemp_c),
              condition: {
                icon: item.day.condition.icon,
              },
            };

            // juntando as horas para sempre ficar 24 horas de previsão, pegando a hora atual adiante
            if (index === 0) {
              const hour1 = item.hour.slice(currentHour).map((hour) => {
                return {
                  time: formatHour(hour.time),
                  temp_c: Math.round(hour.temp_c),
                  condition: { icon: hour.condition.icon },
                };
              });

              const hour2 = next[index + 1].hour
                .slice(0, currentHour)
                .map((hour) => {
                  return {
                    time: formatHour(hour.time),
                    temp_c: Math.round(hour.temp_c),
                    condition: { icon: hour.condition.icon },
                  };
                });

              hours = hour1.concat(hour2);
            }

            return {
              date,
              days,
              hours,
            };
          }
        );

        this.weatherCurrent = {
          location: {
            name: await getTranslation(data.location.name),
            region: await getTranslation(data.location.region),
          },
          current: {
            temp_c: Math.round(data.current.temp_c),
            condition: await getTranslation(data.current.condition.text),
            maxtemp_c: Math.round(newForecast[0].days.maxtemp_c),
            mintemp_c: Math.round(newForecast[0].days.mintemp_c),
          },
          forecast: newForecast,
          extra_info: {
            sunrise: formatInfo.sunTime(
              data.forecast.forecastday[0].astro.sunrise
            ),
            sunset: formatInfo.sunTime(
              data.forecast.forecastday[0].astro.sunset
            ),
            uv: formatInfo.uvIndex(data.current.uv),
            precip_mm: data.current.precip_mm,
            wind_kph: data.current.wind_kph,
            wind_degree: data.current.wind_degree,
            air_quality: {
              co: Number(data.current.air_quality.co).toFixed(2),
              no2: Number(data.current.air_quality.no2).toFixed(2),
              o3: Number(data.current.air_quality.o3).toFixed(2),
              so2: Number(data.current.air_quality.so2).toFixed(2),
              pm2_5: Number(data.current.air_quality.pm2_5).toFixed(2),
              pm10: Number(data.current.air_quality.pm10).toFixed(2),
              air_index: formatInfo.airIndex(
                data.current.air_quality["gb-defra-index"]
              ),
            },
          },
        };
        this.searchIsOpen = false;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.weatherCurrent.isLoaded = true;
        this.showModal = false;
      }
    },
    async getSearchData(term) {
      try {
        const response = await api.getSearchWeather(term);
        this.searchData = response.data;
        this.searchIsOpen = true;
      } catch (error) {
        console.log(error.message);
      }
    },
    clearSearch() {
      this.searchData = [];
      this.searchIsOpen = false;
    },
    handleModal(value) {
      this.showModal = value;
    },
  },
});
