const { Router } = require("express");
const logger = require("../services/logging")("lights.router");
const {
  lightIdsController,
  lightDataController,
  updateController,
  supportedColorsController,
  supportedEffectsController,
  deleteLightController
} = require("../controllers/lights.controller");

const lightsRouter = () => {
  const router = Router();

  router.get("/getLightIds", async (req, res) => {
    logger.info("/api/lights/getLightIds", "route called");
    await lightIdsController().then(lightIds => res.send({ lightIds }));
  });

  router.get("/getLightDataById/:id", async (req, res) => {
    logger.info(
      `/api/lights/getLightDataById/${req.params.id}`,
      "route called"
    );
    await lightDataController(req.params.id).then(lightData =>
      res.send({ lightData })
    );
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
    await supportedColorsController().then(supportedColors =>
      res.send({ supportedColors })
    );
  });

  router.get("/getSupportedEffects", async (req, res) => {
    logger.info("/api/lights/getSupportedEffects", "invoked");
    await supportedEffectsController().then(supportedEffects =>
      res.send({ supportedEffects })
    );
  });

  router.post("/deleteLight", async (req, res) => {
    logger.info("/api/lights/deleteLight", "route called");
    await deleteLightController(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        logger.error(
          "/api/lights/deleteLight",
          `Failed to delete light ID: ${req.body ? req.body.id : null}`,
          err
        );
        res.sendStatus(500);
      });
  });

  return router;
};

module.exports = { lightsRouter };
