const { Router } = require("express");
const logger = require("../services/logging")("lights.router");
const {
  lightsDataController,
  lightDataController,
  supportedColorsController
} = require("../controllers/lights.controller");

const lightsRouter = () => {
  const router = Router();

  router.get("/getLightsData", async (req, res) => {
    logger.info("/api/lights/getLightsData", "route called");
    let lightsData = null;
    try {
      lightsData = await lightsDataController();
    } catch (err) {
      logger.error("/api/lights/getLightsData", "Could not retrieve data", err);
      throw err;
    }
    res.send({ lightsData });
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

  return router;
};

module.exports = { lightsRouter };
