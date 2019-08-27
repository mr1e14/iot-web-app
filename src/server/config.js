module.exports = {
  DARK_SKY_URL: "https://api.darksky.net/forecast/",
  DARK_SKY_API_OPTIONS:
    "/51.5074,0.1278?exclude=minutely,hourly,daily&units=si",
  WEATHER_CACHE_REFRESH_AFTER_SECONDS: 900,
  WEATHER_CACHE_DELETE_AFTER_SECONDS: 3600,
  LOG_DIR: "logs",
  IOT_DB_URL: process.env.IOT_DB_URL || "mongodb://localhost:27017/iot_db",
  SAMPLE_LIGHTS_DATA_DOCUMENT: "fourLights"
};
