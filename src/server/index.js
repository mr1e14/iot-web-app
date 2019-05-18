require("dotenv").config();
const express = require("express");
const path = require("path");
const { getWeatherData } = require("./connectors/dark-sky-api");
const { getCache } = require("./services/cache");
const {
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS
} = require("./config");
const logger = require("./services/logging")("index");
const { oneLight, twoLights, fourLights } = require("./sample_data/lights");

const app = express();

const weatherCache = getCache(
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS,
  getWeatherData
);

app.use(express.static("dist"));

app.get("/api/getWeatherData", async (req, res) => {
  logger.info("app.get/api/getWeatherData", "invoked");
  let weatherData = null;
  try {
    weatherData = await weatherCache.get("weatherData");
  } catch (err) {
    logger.error(
      "app.get/api/getWeatherData",
      "Failed to retrieve weather data",
      err
    );
  }
  res.send({ weatherData });
});

app.get("/api/getLightsData", async (req, res) => {
  res.send({ lightsData: fourLights });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
  logger.info("app.listen", `Listening on port ${process.env.PORT || 8080}!`)
);
