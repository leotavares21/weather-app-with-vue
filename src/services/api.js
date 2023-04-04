import axios from "axios";

const apiWeather = axios.create({
  baseURL: "https://api.weatherapi.com/v1/",
});

export default {
  getWeather(lat, lon) {
    return apiWeather.get(
      `/forecast.json?key=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&q=${lat}, ${lon}&days=10&aqi=yes&alerts=no`
    );
  },
  getSearchWeather(term) {
    return apiWeather.get(
      `/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${term}`
    );
  },
};
