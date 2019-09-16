const logger = require("../services/logging")("lights.controller");
const {
  getConfigItems,
  getLightsIds,
  getLightDataById,
  getLightSettingsById,
  updateLightData,
  deleteLightById
} = require("../connectors/iot-db");
const { getCache } = require("../services/cache");

const supportedColorsCache = getCache(0, 0, getConfigItems, {
  id: "supportedColors"
});
const supportedEffectsCache = getCache(0, 0, getConfigItems, {
  id: "supportedEffects"
});
const effectsConfigurationCache = getCache(0, 0, getConfigItems, {
  id: "effectsConfiguration"
});

const lightIdsCache = getCache(0, 0, getLightsIds);
const lightsDataCache = getCache(0, 0, getLightDataById);
const lightsSettingsCache = getCache(0, 0, getLightSettingsById);

const lightIdsController = async () => {
  logger.info("lightIdsController", "invoked");

  let lightIds = null;
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

const lightSettingsController = async id => {
  logger.info("lightSettingsController", "invoked");

  let lightSettings = null;
  try {
    lightSettings = await lightsSettingsCache.get(id, { id });
  } catch (err) {
    logger.error(
      "lightSettingsController",
      "Failed to retrieve light settings",
      err
    );
  }
  return lightSettings;
};

const updateController = async lightData => {
  logger.info("updateController", "invoked");
  await lightsDataCache
    .update(lightData.id, lightData)
    .then(async () => await updateLightData(lightData))
    .catch(err => {
      logger.error("updateController", "Failed to update lights data", err);
      throw err;
    });
};

const supportedColorsController = async () => {
  logger.info("supportedColorsController", "invoked");
  let supportedColors = [];
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
  let supportedEffects = [];
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

const effectsConfigurationController = async () => {
  logger.info("effectsConfigurationController", "invoked");
  let effectsConfiguration = [];
  try {
    effectsConfiguration = await effectsConfigurationCache.get(
      "effectsConfiguration"
    );
  } catch (err) {
    logger.error(
      "effectsConfigurationController",
      "Failed to retrieve effects configuration",
      err
    );
    throw err;
  }
  return effectsConfiguration;
};

const deleteLightController = async ({ id }) => {
  logger.info("deleteLightController", "invoked");
  await deleteLightById(id)
    .then(async () => await lightIdsCache.deleteByKey("lightIds"))
    .then(async () => await lightsDataCache.deleteByKey(id))
    .catch(err => {
      logger.error("deleteLightController", "Failed to delete light", err);
      throw err;
    });
};

module.exports = {
  lightIdsController,
  lightDataController,
  lightSettingsController,
  updateController,
  supportedColorsController,
  supportedEffectsController,
  effectsConfigurationController,
  deleteLightController
};
