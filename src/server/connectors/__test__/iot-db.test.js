jest.mock("mongodb");
jest.mock("../../services/logging", () => {
  return jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }));
});

const {
  getConfigItems,
  getLightDataById,
  getLightsIds,
  updateLightData
} = require("../iot-db");
const mongo = require("mongodb");

describe("getConfigItems", () => {
  const validResponse = {
    _id: "supportedColors",
    values: ["red", "blue", "green"]
  };
  let result;
  describe("given the request is successful", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => validResponse
          })
        })
      }));
      result = await getConfigItems("supportedColorsItem");
    });
    it("should return valid response", () => {
      expect(result).toEqual(validResponse.values);
    });
  });
  describe("given the request returns null", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => null
          })
        })
      }));
      try {
        await getConfigItems("supportedColorsItem");
      } catch (err) {
        result = err;
      }
    });
    it("should throw an error", () => {
      expect(result instanceof TypeError).toBe(true);
    });
  });
  describe("given the request results in an error", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => {
        throw new Error("can't connect");
      });
      try {
        await getConfigItems("supportedColorsItem");
      } catch (err) {
        result = err;
      }
    });
    it("should throw an error", () => {
      expect(result.message).toEqual("can't connect");
    });
  });
});

describe("getLightDataById", () => {
  const validResponse = {
    _id: "asdfghjkl123456",
    color: "red",
    brightness: 10
  };
  let result;
  describe("given the request is successful", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => validResponse
          })
        })
      }));
      result = await getLightDataById("zxcvbnm0987");
    });
    it("should return valid response", () => {
      expect(result).toEqual(validResponse);
    });
  });
  describe("given the request returns null", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => null
          })
        })
      }));

      result = await getLightDataById("zxcvbnm0987");
    });
    it("should return null", () => {
      expect(result).toBe(null);
    });
  });
  describe("given the request results in an error", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => {
        throw new Error("can't connect");
      });
      try {
        await getLightDataById("zxcvbnm0987");
      } catch (err) {
        result = err;
      }
    });
    it("should throw an error", () => {
      expect(result.message).toEqual("can't connect");
    });
  });
});
describe("getLightsIds", () => {
  const validResponse = ["asdfgh1234", "lkjhgfs09876"];
  let result;
  describe("given the request is successful", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            distinct: () => validResponse
          })
        })
      }));
      result = await getLightsIds();
    });
    it("should return valid response", () => {
      expect(result).toEqual(validResponse);
    });
  });
  describe("given the request returns null", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            distinct: () => null
          })
        })
      }));

      result = await getLightsIds();
    });
    it("should return null", () => {
      expect(result).toBe(null);
    });
  });
  describe("given the request results in an error", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => {
        throw new Error("can't connect");
      });
      try {
        await getLightsIds();
      } catch (err) {
        result = err;
      }
    });
    it("should throw an error", () => {
      expect(result.message).toEqual("can't connect");
    });
  });
});
describe("updateLightData", () => {
  let result;
  const exampleLightData = {
    name: "bedroom",
    color: "red",
    brightness: "100"
  };
  const updateOneMock = jest.fn();
  describe("given the request is successful", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            updateOne: updateOneMock
          })
        })
      }));
      await updateLightData(exampleLightData);
    });
    it("should call the mock function", () => {
      expect(updateOneMock).toHaveBeenCalledTimes(1);
    });
  });
  describe("given the request results in an error", () => {
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => {
        throw new Error("can't connect");
      });
      try {
        await updateLightData(exampleLightData);
      } catch (err) {
        result = err;
      }
    });
    it("should throw an error", () => {
      expect(result.message).toEqual("can't connect");
    });
  });
});
