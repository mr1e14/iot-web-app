const { Router } = require("express");
const logger = require("../services/logging")("api");
const { getWeatherData } = require("../connectors/dark-sky-api");
const { getCache } = require("../services/cache");
const {
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS
} = require("../config");

const weatherCache = getCache(
  WEATHER_CACHE_REFRESH_AFTER_SECONDS,
  WEATHER_CACHE_DELETE_AFTER_SECONDS,
  getWeatherData
);
const { lightsRouter } = require("./lights");

const apiRouter = () => {
  const router = Router();

  router.get("/getWeatherData", async (req, res) => {
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

  router.use("/lights", lightsRouter());
  return router;
};

module.exports = { apiRouter };
