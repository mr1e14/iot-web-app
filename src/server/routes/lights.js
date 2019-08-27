const { Router } = require("express");
const logger = require("../services/logging")("api");
const { oneLight, twoLights, fourLights } = require("../sample_data/lights");
const { getSupportedColors } = require("../connectors/db/iot-db");
const { getCache } = require("../services/cache");

const supportedColorsCache = getCache(0, 0, getSupportedColors);

const lightsRouter = () => {
  const router = Router();

  router.get("/getLightsData", async (req, res) => {
    // TODO get from db and cache
    res.send({ lightsData: fourLights });
  });

  router.get("/getLightDataById/:id", async (req, res) => {
    // TODO get from db and cache
    let lightData;
    console.log(`param id: ${req.params.id}`);
    fourLights.forEach(light => {
      if (light.id === req.params.id) {
        lightData = { ...light };
      }
    });
    res.send({ lightData });
  });

  router.get("/getSupportedColors", async (req, res) => {
    logger.info("app.get/api/getSupportedColors", "invoked");
    let supportedColors = null;
    try {
      supportedColors = await supportedColorsCache.get("supportedColors");
    } catch (err) {
      logger.error(
        "app.get/api/getSupportedColors",
        "Failed to retrieve supported colors",
        err
      );
    }
    res.send({ supportedColors });
  });

  return router;
};

module.exports = { lightsRouter };
