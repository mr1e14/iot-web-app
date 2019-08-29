const nodeCacheMockGet = jest.fn();
const nodeCacheMockSet = jest.fn();
const nodeCacheMock = jest.mock("node-cache", () => {
  return jest.fn().mockImplementation(() => {
    return {
      get: nodeCacheMockGet,
      set: nodeCacheMockSet,
      on: (event, cb) => {
        try {
          cb();
        } catch (err) {
          throw err;
        }
      }
    };
  });
});

const { getCache } = require("../cache");

const getValueCallback = jest.fn().mockImplementation(params => {
  return Promise.resolve("some value");
});

describe("cache", () => {
  beforeEach(() => {
    nodeCacheMock.clearAllMocks();
    nodeCacheMockGet.mockClear();
    nodeCacheMockSet.mockClear();
  });
  describe("Given no value is cached for a key", () => {
    let myCache = getCache(60, 120, getValueCallback, {});
    let value;
    beforeEach(async () => {
      nodeCacheMockGet.mockImplementation(() => {
        return undefined;
      });
      value = await myCache.get("key");
    });
    it("should attempt to get value from cache first", () => {
      expect(nodeCacheMockGet).toHaveBeenCalledTimes(1);
    });
    it("should call provided callback function with empty object", () => {
      expect(getValueCallback).toHaveBeenCalledTimes(1);
      expect(getValueCallback).toHaveBeenCalledWith({});
    });
    it("should return getValueCallback value", () => {
      expect(value).toBe("some value");
    });
    it("should save retrieved value in cache", () => {
      expect(nodeCacheMockSet).toHaveBeenCalledWith("key", "some value");
    });
  });
  describe("Given value is cached for a key", () => {
    let myCache = getCache(60, 120, getValueCallback, {});
    let value;
    beforeEach(async () => {
      nodeCacheMockGet.mockImplementation(() => {
        return "cached value";
      });
      value = await myCache.get("key");
    });
    it("should get value from cache successfully", () => {
      expect(nodeCacheMockGet).toHaveReturnedWith("cached value");
    });
    it("should not call provided callback function", () => {
      expect(getValueCallback).toHaveBeenCalledTimes(0);
    });
    it("should assign cached value to the variable correctly", () => {
      expect(value).toBe("cached value");
    });
    it("should not attempt to save retrieved value in cache", () => {
      expect(nodeCacheMockSet).toHaveBeenCalledTimes(0);
    });
  });
  describe("Given library throws an error", () => {
    let myCache = getCache(60, 120, getValueCallback, {});
    let value;
    let error;
    beforeEach(async () => {
      nodeCacheMockGet.mockImplementation(() => {
        throw new Error("unexpected exception");
      });
      try {
        value = await myCache.get("key");
      } catch (err) {
        error = err;
      }
    });
    it("should not return any value", () => {
      expect(value).toBe(undefined);
    });
    it("should throw the error", () => {
      expect(error.message).toBe("unexpected exception");
    });
  });
  describe("Given cached value expires and getValue fails", () => {
    beforeEach(async () => {
      getValueCallback.mockImplementation(() => {
        throw new Error("some error");
      });
      getCache(60, 120, getValueCallback, {});
    });
    it("should call provided callback function and swallow exception", () => {
      expect(getValueCallback).toHaveBeenCalledTimes(1);
    });
  });
});
