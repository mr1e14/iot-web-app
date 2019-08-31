const logger = require("../services/logging")("lights.controller");
const {
  getConfigItems,
  getLightsIds,
  getLightDataById
} = require("../connectors/db/iot-db");
const { getCache } = require("../services/cache");

const supportedColorsCache = getCache(0, 0, getConfigItems, {
  id: "supportedColors"
});
const supportedEffectsCache = getCache(0, 0, getConfigItems, {
  id: "supportedEffects"
});

const lightIdsCache = getCache(0, 0, getLightsIds);
const lightsDataCache = getCache(0, 0, getLightDataById);

const lightIdsController = async () => {
  logger.info("lightIdsController", "invoked");

  let lightIds = [];
  try {
    lightIds = await lightIdsCache.get("lightIds");
  } catch (err) {
    logger.error("lightIdsController", "Failed to retrieve lights' IDs", err);
  }
  return lightIds;
};

const lightDataController = async id => {
  logger.info("lightDataController", "invoked");

  let lightData = null;
  try {
    lightData = await lightsDataCache.get(id, { id });
  } catch (err) {
    logger.error(
      "lightDataController",
      "Failed to retrieve all lights data",
      err
    );
  }
  return lightData;
};

const updateController = async lightData => {
  logger.info("updateController", "invoked");
  lightsDataCache.update(lightData.id, lightData);
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

const supportedEffectsController = async () => {
  logger.info("supportedEffectsController", "invoked");
  let supportedEffects = null;
  try {
    supportedEffects = await supportedEffectsCache.get("supportedEffects");
  } catch (err) {
    logger.error(
      "supportedEffectsController",
      "Failed to retrieve supported effects",
      err
    );
    throw err;
  }
  return supportedEffects;
};

module.exports = {
  lightIdsController,
  lightDataController,
  updateController,
  supportedColorsController,
  supportedEffectsController
};
