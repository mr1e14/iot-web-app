const mongo = require("mongodb");
const { IOT_DB_URL } = require("../../config");
const logger = require("../../services/logging")("iot-db");

let client;
let db;
let configCollection;

const establishConnection = async () => {
  logger.info("establishConnection", "invoked");
  client = await mongo.MongoClient.connect(IOT_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db = client.db("iot_db");
  configCollection = db.collection("config");
};

const getSupportedColors = async () => {
  logger.info("getSupportedColors", "invoked");

  try {
    await establishConnection();

    const supportedColors = await configCollection.findOne({
      _id: "supportedColors"
    });

    return supportedColors.values;
  } catch (err) {
    logger.error(
      "getSupportedColors",
      "Failed to retrieve list of colors",
      err
    );
    throw err;
  }
};

module.exports = { getSupportedColors };
