const mongo = require("mongodb");
const { IOT_DB_URL } = require("../../config");
const logger = require("../../services/logging")("iot-db");
const { SAMPLE_LIGHTS_DATA_DOCUMENT } = require("../../config");

let client;
let db;
let configCollection;
let sampleDataCollection;

const establishConnection = async () => {
  logger.info("establishConnection", "invoked");
  client = await mongo.MongoClient.connect(IOT_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db = client.db("iot_db");
  configCollection = db.collection("config");
  sampleDataCollection = db.collection("sample_data");
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

const getSampleLightsData = async () => {
  logger.info("getSampleLightsData", "invoked");

  try {
    await establishConnection();

    const sampleLightsData = await sampleDataCollection.findOne({
      _id: SAMPLE_LIGHTS_DATA_DOCUMENT
    });

    return sampleLightsData.data;
  } catch (err) {
    logger.error("getSampleLightsData", "Failed to retrieve sample data", err);
    throw err;
  }
};

module.exports = { getConfigItems, getSampleLightsData };
