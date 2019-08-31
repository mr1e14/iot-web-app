const mongo = require("mongodb");
const { IOT_DB_URL } = require("../../config");
const logger = require("../../services/logging")("iot-db");

let client;
let db;
let configCollection;
let lightsDataCollection;

const establishConnection = async () => {
  logger.info("establishConnection", "invoked");
  client = await mongo.MongoClient.connect(IOT_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db = client.db("iot_db");
  configCollection = db.collection("config");
  lightsDataCollection = db.collection("lights_data");
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
    throw err;
  }
};

module.exports = {
  getConfigItems,
  getLightsIds,
  getLightDataById,
  updateLightData
};
