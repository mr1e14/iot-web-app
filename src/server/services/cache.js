const NodeCache = require("node-cache");
const logger = require("./logging")("cache");

const getCache = (
  refreshAfterSeconds,
  deleteAfterSeconds,
  getValue,
  params
) => {
  const nodeCache = new NodeCache({
    stdTTL: refreshAfterSeconds,
    checkperiod: deleteAfterSeconds
  });

  const get = async (key, newParams) => {
    logger.info(`get(${key})`, "invoked");
    const value = await nodeCache.get(key);
    if (value) {
      return Promise.resolve(value);
    } else {
      return getValue(newParams || params).then(newValue => {
        nodeCache.set(key, newValue);
        return newValue;
      });
    }
  };

  nodeCache.on("expired", async (key, value) => {
    logger.info(
      `nodeCache.on("expired")`,
      `Key: ${key}, Value: ${JSON.stringify(value)} expired`
    );
    let newValue = null;
    try {
      newValue = await getValue(params);
      nodeCache.set(key, newValue);
      logger.info(
        `nodeCache.on("expired")`,
        `Key: ${key}, New Value: ${JSON.stringify(newValue)} saved`
      );
    } catch (err) {
      logger.error(
        `nodeCache.on("expired")`,
        "Could not auto-retrieve expired value",
        err
      );
    }
  });

  nodeCache.on("del", (key, value) => {
    logger.info(
      `nodeCache.on("del")`,
      `Key: ${key}, Value: ${JSON.stringify(value)} deleted`
    );
  });

  const update = async (key, value) => {
    logger.info(`update(${key}, ${JSON.stringify(value)})`, "invoked");
    nodeCache.set(key, value);
  };

  const cache = { get, update };
  return cache;
};

module.exports = { getCache };
