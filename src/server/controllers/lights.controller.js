const logger = require("../services/logging")("lights.controller");
const {
  getSupportedColors,
  getSampleLightsData
} = require("../connectors/db/iot-db");
const { getCache } = require("../services/cache");

const supportedColorsCache = getCache(0, 0, getSupportedColors);
let lightsDataCache;

const lightsDataController = async () => {
  logger.info("lightsDataController", "invoked");

  let lightsData = null;
  if (process.env.NODE_ENV !== "production") {
    if (!lightsDataCache) {
      lightsDataCache = getCache(0, 0, getSampleLightsData);
    }
    try {
      lightsData = await lightsDataCache.get("lightsData");
    } catch (err) {
      logger.error(
        "lightsDataController",
        "Failed to retrieve sample data",
        err
      );
      throw err;
    }
  } else {
    // TODO real API call and temporary cache
  }
  return lightsData;
};

const lightDataController = async id => {
  logger.info("lightDataController", "invoked");

  let lightData = null;
  try {
    const lightsData = await lightsDataCache.get("lightsData");
    lightsData.forEach(light => {
      if (light.id === id) {
        lightData = { ...light };
      }
    });
  } catch (err) {
    logger.error(
      "lightDataController",
      "Failed to retrieve all lights data",
      err
    );
  }
  return lightData;
};

const supportedColorsController = async () => {
  logger.info("supportedColorsController", "invoked");
  let supportedColors = null;
  try {
    supportedColors = await supportedColorsCache.get("supportedColors");
  } catch (err) {
    logger.error(
      "supportedColorsController",
      "Failed to retrieve supported colors",
      err
    );
    throw err;
  }
  return supportedColors;
};

module.exports = {
  lightsDataController,
  lightDataController,
  supportedColorsController
};