require("dotenv").config();
const express = require("express");
const { getWeatherData } = require("./connectors/dark-sky-api");
const { getCache } = require("./services/cache.service");
const {
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS
} = require("./config");

const app = express();

const weatherCache = getCache(
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS,
  getWeatherData
);

app.use(express.static("dist"));

app.get("/api/getWeatherData", async (req, res) => {
  // TODO logging service?
  let weatherData = null;
  try {
    weatherData = await weatherCache.get("data");
  } catch (err) {
    console.log(err);
  }
  res.send({ weatherData });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
