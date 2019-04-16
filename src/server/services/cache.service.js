const NodeCache = require("node-cache");

const getCache = (refreshAfterSeconds, deleteAfterSeconds, getValue) => {
  const nodeCache = new NodeCache({
    stdTTL: refreshAfterSeconds,
    checkperiod: deleteAfterSeconds
  });

  const get = async key => {
    try {
      const value = await nodeCache.get(key);
      if (value) {
        return Promise.resolve(value);
      } else {
        return getValue().then(newValue => {
          nodeCache.set(key, newValue);
          return newValue;
        });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  nodeCache.on("expired", (key, value) => {
    console.log(`Key: ${key}, Value: ${JSON.stringify(value)} expired`);
    try {
      return getValue().then(newValue => {
        nodeCache.set(key, newValue);
        return newValue;
      });
    } catch (err) {
      console.log(err);
    }
  });

  const cache = { get };
  return cache;
};

module.exports = { getCache };
