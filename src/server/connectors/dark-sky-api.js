const { DARK_SKY_URL, DARK_SKY_API_OPTIONS } = require("../config");
const rp = require("request-promise-native");
const logger = require("../services/logging")("dark-sky-api");

const getWeatherData = () => {
  logger.info("getWeatherData", "invoked");
  const url =
    DARK_SKY_URL + process.env.DARK_SKY_API_KEY + DARK_SKY_API_OPTIONS;
  return rp(url).then(data => {
    const weather = JSON.parse(data);
    return Promise.resolve({
      temperature: weather.currently.temperature,
      humidity: weather.currently.humidity,
      icon: weather.currently.icon
    });
  });
};

module.exports = { getWeatherData };
