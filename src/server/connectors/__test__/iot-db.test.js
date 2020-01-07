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
  getLightSettingsById,
  updateLightData,
  updateLightSettings,
  deleteLightById,
  clearConnection,
  addLight
} = require("../iot-db");
const mongo = require("mongodb");

describe("iot-db", () => {
  beforeEach(() => {
    clearConnection();
  });
  describe("when multiple calls are made", () => {
    const connect = jest.fn(() => ({
      db: () => ({
        collection: () => ({
          findOne: () => ({ values: [] })
        })
      })
    }));
    beforeEach(async () => {
      mongo.MongoClient.connect.mockImplementation(() => connect());
      await getConfigItems("");
      await getLightDataById(0);
    });
    it("should try to connect only once", () => {
      expect(connect).toHaveBeenCalledTimes(1);
    });
  });
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
  describe("deleteLightById", () => {
    let result;
    const deleteOneMock = jest.fn();
    describe("given the request is successful", () => {
      beforeEach(async () => {
        mongo.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              deleteOne: deleteOneMock
            })
          })
        }));
        await deleteLightById("id123");
      });
      it("should call the mock function", () => {
        expect(deleteOneMock).toHaveBeenCalledTimes(1);
      });
    });
    describe("given the request results in an error", () => {
      beforeEach(async () => {
        mongo.MongoClient.connect.mockImplementation(() => {
          throw new Error("can't connect");
        });
        try {
          await deleteLightById("id123");
        } catch (err) {
          result = err;
        }
      });
      it("should throw an error", () => {
        expect(result.message).toEqual("can't connect");
      });
    });
  });
  describe("getLightSettingsById", () => {
    const validResponse = {
      _id: "asdfghjkl123456",
      transitionSpeed: 10,
      strobeDuration: 5
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
        result = await getLightSettingsById("zxcvbnm0987");
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

        result = await getLightSettingsById("zxcvbnm0987");
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
          await getLightSettingsById("zxcvbnm0987");
        } catch (err) {
          result = err;
        }
      });
      it("should throw an error", () => {
        expect(result.message).toEqual("can't connect");
      });
    });
  });
  describe("updateLightSettings", () => {
    let result;
    const exampleLightSettings = {
      transitionSpeed: 10,
      strobeDuration: 5
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
        await updateLightSettings(exampleLightSettings);
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
          await updateLightSettings(exampleLightSettings);
        } catch (err) {
          result = err;
        }
      });
      it("should throw an error", () => {
        expect(result.message).toEqual("can't connect");
      });
    });
  });
  describe("addLight", () => {
    let result;
    const insertOneMock = jest.fn();
    const exampleLightData = {
      name: "bedroom",
      color: "red",
      brightness: "100",
      ip: "192.168.0.254"
    };
    describe("given the request is successful", () => {
      beforeEach(async () => {
        mongo.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              insertOne: insertOneMock
            })
          })
        }));
        await addLight(exampleLightData);
      });
      it("should call the mock function with initial data", () => {
        expect(insertOneMock).toHaveBeenCalledTimes(1);
        expect(insertOneMock).toHaveBeenCalledWith(exampleLightData);
      });
    });
    describe("given the request results in an error", () => {
      beforeEach(async () => {
        mongo.MongoClient.connect.mockImplementation(() => {
          throw new Error("can't connect");
        });
        try {
          await addLight(exampleLightData);
        } catch (err) {
          result = err;
        }
      });
      it("should throw an error", () => {
        expect(result.message).toEqual("can't connect");
      });
    });
  });
});
