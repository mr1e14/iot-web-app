const mongo = require("mongodb");
const { IOT_DB_URL } = require("../config");
const logger = require("../services/logging")("iot-db");

let client;
let db;
let configCollection;
let lightsDataCollection;
let lightSettingsCollection;

const establishConnection = async () => {
  logger.info("establishConnection", "invoked");

  if (!client) {
    client = await mongo.MongoClient.connect(IOT_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = client.db("iot_db");
    configCollection = db.collection("config");
    lightsDataCollection = db.collection("lights_data");
    lightSettingsCollection = db.collection("light_settings");
  }
};

const getConfigItems = async ({ id }) => {
  logger.info(`getConfigItems(${id})`, "invoked");

  try {
    await establishConnection();

    const item = await configCollection.findOne({
      _id: id
    });

    return item.values;
  } catch (err) {
    logger.error(
      `getConfigItems(${id})`,
      "Failed to retrieve list of colors",
      err
    );
    client = null;
    throw err;
  }
};

const getLightsIds = async () => {
  logger.info("getLightsIds", "invoked");

  try {
    await establishConnection();

    const lightIds = await lightsDataCollection.distinct("_id");

    return lightIds;
  } catch (err) {
    logger.error("getLightsIds", "Failed to retrieve data", err);
    client = null;
    throw err;
  }
};

const getLightDataById = async ({ id }) => {
  logger.info(`getLightDataById(${id})`, "invoked");

  try {
    await establishConnection();

    const lightData = await lightsDataCollection.findOne({
      _id: id
    });

    return lightData;
  } catch (err) {
    logger.error(`getLightDataById(${id})`, "Failed to retrieve data", err);
    client = null;
    throw err;
  }
};

const getLightSettingsById = async ({ id }) => {
  logger.info(`getLightSettingsById(${id})`, "invoked");

  try {
    await establishConnection();

    const lightsSettings = await lightSettingsCollection.findOne({
      _id: id
    });

    return lightsSettings;
  } catch (err) {
    logger.error(`getLightSettingsById(${id})`, "Failed to retrieve data", err);
    client = null;
    throw err;
  }
};

const updateLightData = async lightData => {
  logger.info(`updateLightData(${JSON.stringify(lightData)}`, "invoked");

  try {
    await establishConnection();

    await lightsDataCollection.updateOne(
      {
        _id: lightData.id
      },
      {
        $set: {
          ...lightData
        }
      }
    );
  } catch (err) {
    logger.error(
      `updateLightData(${JSON.stringify(lightData)})`,
      "Failed to update data",
      err
    );
    client = null;
    throw err;
  }
};

const updateLightSettings = async lightSettings => {
  logger.info(
    `updateLightSettings(${JSON.stringify(lightSettings)}`,
    "invoked"
  );

  try {
    await establishConnection();

    await lightSettingsCollection.updateOne(
      {
        _id: lightSettings.id
      },
      {
        $set: {
          ...lightSettings
        }
      }
    );
  } catch (err) {
    logger.error(
      `updateLightSettings(${JSON.stringify(lightSettings)})`,
      "Failed to update settings",
      err
    );
    client = null;
    throw err;
  }
};

const deleteLightById = async id => {
  logger.info(`deleteLightById(${id})`, "invoked");

  try {
    await establishConnection();

    await lightsDataCollection.deleteOne({
      _id: id
    });
  } catch (err) {
    client = null;
    logger.error(`deleteLightById(${id})`, "Failed to delete data", err);
    throw err;
  }
};

const clearConnection = () => {
  client = null;
};

module.exports = {
  getConfigItems,
  getLightsIds,
  getLightDataById,
  getLightSettingsById,
  updateLightData,
  updateLightSettings,
  deleteLightById,
  clearConnection
};
