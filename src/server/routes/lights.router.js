const { Router } = require("express");
const logger = require("../services/logging")("lights.router");
const {
  lightIdsController,
  lightDataController,
  updateController,
  supportedColorsController,
  supportedEffectsController
} = require("../controllers/lights.controller");

const lightsRouter = () => {
  const router = Router();

  router.get("/getLightIds", async (req, res) => {
    logger.info("/api/lights/getLightIds", "route called");
    let lightIds = null;
    try {
      lightIds = await lightIdsController();
    } catch (err) {
      logger.error("/api/lights/getLightIds", "Could not retrieve data", err);
      throw err;
    }
    res.send({ lightIds });
  });

  router.get("/getLightDataById/:id", async (req, res) => {
    logger.info(
      `/api/lights/getLightDataById/${req.params.id}`,
      "route called"
    );
    let lightData = null;
    try {
      lightData = await lightDataController(req.params.id);
    } catch (err) {
      logger.error(
        "/api/lights/getLightDataById",
        `Failed to retrieve data for light ID: ${req.params.id}`,
        err
      );
      throw err;
    }
    res.send({ lightData });
  });

  router.post("/updateLightData", async (req, res) => {
    logger.info("/api/lights/updateLightData", "route called");
    await updateController(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        logger.error(
          "/api/lights/updateLightData",
          `Failed to update data for light ID: ${
            req.body ? req.body.id : null
          }`,
          err
        );
        res.sendStatus(500);
      });
  });

  router.get("/getSupportedColors", async (req, res) => {
    logger.info("/api/lights/getSupportedColors", "invoked");
    let supportedColors = null;
    try {
      supportedColors = await supportedColorsController();
    } catch (err) {
      logger.error(
        "/api/lights/getSupportedColors",
        "Failed to retrieve supported colors",
        err
      );
      throw err;
    }
    res.send({ supportedColors });
  });

  router.get("/getSupportedEffects", async (req, res) => {
    logger.info("/api/lights/getSupportedEffects", "invoked");
    let supportedEffects = null;
    try {
      supportedEffects = await supportedEffectsController();
    } catch (err) {
      logger.error(
        "/api/lights/getSupportedEffects",
        "Failed to retrieve supported effects",
        err
      );
      throw err;
    }
    res.send({ supportedEffects });
  });

  return router;
};

module.exports = { lightsRouter };
