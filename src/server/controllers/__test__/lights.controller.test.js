jest.mock("../../services/logging", () => {
  return jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }));
});
/*
jest.mock("../../connectors/iot-db");
const {
  updateLightData,
  updateLightSettings,
  deleteLightById
} = require("../../connectors/iot-db");*/

/*const {
  lightDataController,
  lightIdsController,
  lightSettingsController,
  deleteLightController,
  updateController,
  updateSettingsController,
  supportedColorsController,
  supportedEffectsController,
  effectsConfigurationController
} = require("../lights.controller");*/

describe("lights.controller", () => {
  const configItems = {
    supportedColors: ["red", "blue", "white"],
    supportedEffects: ["lsd", "disco"],
    effectsConfiguration: [
      {
        effect: "lsd",
        config: {}
      }
    ]
  };
  const lightData = { id: 1, color: "red", brightness: 100 };
  const lightSettings = { transitionSpeed: 30, duration: 120 };
  const lightIds = [1, 2, 3];
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  describe("lightDataController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => lightData
        }));
        const { lightDataController } = require("../lights.controller");
        result = await lightDataController();
      });
      it("returns light data", () => {
        expect(result).toEqual(lightData);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("no data");
          }
        }));
        const { lightDataController } = require("../lights.controller");
        try {
          await lightDataController();
        } catch (err) {
          result = err;
        }
      });
      it("throws exception", () => {
        expect(result.message).toEqual("no data");
      });
    });
  });
  describe("lightIdsController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => lightIds
        }));
        const { lightIdsController } = require("../lights.controller");
        result = await lightIdsController();
      });
      it("returns light Ids", () => {
        expect(result).toEqual(lightIds);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("couldn't get ids");
          }
        }));
        const { lightIdsController } = require("../lights.controller");
        try {
          await lightIdsController();
        } catch (err) {
          result = err;
        }
      });
      it("throws exception", () => {
        expect(result.message).toEqual("couldn't get ids");
      });
    });
  });
  describe("lightSettingsController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => lightSettings
        }));
        const { lightSettingsController } = require("../lights.controller");
        result = await lightSettingsController();
      });
      it("returns light settings", () => {
        expect(result).toEqual(lightSettings);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("couldn't get settings");
          }
        }));
        const { lightSettingsController } = require("../lights.controller");
        result = await lightSettingsController();
      });
      it("returns null", () => {
        expect(result).toEqual(null);
      });
    });
  });
  describe("supportedColorsController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => configItems.supportedColors
        }));
        const { supportedColorsController } = require("../lights.controller");
        result = await supportedColorsController();
      });
      it("returns supported colors", () => {
        expect(result).toEqual(configItems.supportedColors);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("couldn't get supported colors");
          }
        }));
        const { supportedColorsController } = require("../lights.controller");
        result = await supportedColorsController();
      });
      it("returns empty array", () => {
        expect(result).toEqual([]);
      });
    });
  });
  describe("supportedEffectsController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => configItems.supportedEffects
        }));
        const { supportedEffectsController } = require("../lights.controller");
        result = await supportedEffectsController();
      });
      it("returns supported effects", () => {
        expect(result).toEqual(configItems.supportedEffects);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("couldn't get supported effects");
          }
        }));
        const { supportedEffectsController } = require("../lights.controller");
        result = await supportedEffectsController();
      });
      it("returns empty array", () => {
        expect(result).toEqual([]);
      });
    });
  });
  describe("effectsConfigurationController", () => {
    describe("when cache service gets data", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => configItems.effectsConfiguration
        }));
        const {
          effectsConfigurationController
        } = require("../lights.controller");
        result = await effectsConfigurationController();
      });
      it("returns light settings", () => {
        expect(result).toEqual(configItems.effectsConfiguration);
      });
    });
    describe("when cache service fails", () => {
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          get: async () => {
            throw new Error("couldn't get configuration");
          }
        }));
        const {
          effectsConfigurationController
        } = require("../lights.controller");
        try {
          await effectsConfigurationController();
        } catch (err) {
          result = err;
        }
      });
      it("throws exception", () => {
        expect(result.message).toEqual("couldn't get configuration");
      });
    });
  });
  describe("updateController", () => {
    describe("when cache update is successful", () => {
      const cacheUpdate = jest.fn(async () => undefined);
      describe("when db update is successful", () => {
        const iotDbUpdate = jest.fn(async () => undefined);
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            update: cacheUpdate
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.updateLightData = iotDbUpdate;
          const { updateController } = require("../lights.controller");
          await updateController(lightData);
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightData.id, lightData);
        });
        it("calls updateLightData", () => {
          expect(iotDbUpdate).toHaveBeenCalledTimes(1);
          expect(iotDbUpdate).toHaveBeenCalledWith(lightData);
        });
      });
      describe("when db update fails", () => {
        const iotDbUpdate = jest.fn(async () => {
          throw new Error("db update failed");
        });
        let result;
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            update: cacheUpdate
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.updateLightData = iotDbUpdate;
          const { updateController } = require("../lights.controller");
          try {
            await updateController(lightData);
          } catch (error) {
            result = error;
          }
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightData.id, lightData);
        });
        it("calls updateLightData", () => {
          expect(iotDbUpdate).toHaveBeenCalledTimes(1);
          expect(iotDbUpdate).toHaveBeenCalledWith(lightData);
        });
        it("throws exception", () => {
          expect(result.message).toEqual("db update failed");
        });
      });
    });
    describe("when cache update fails", () => {
      const cacheUpdate = jest.fn(async () => {
        throw new Error("cache update failed");
      });
      const iotDbUpdate = jest.fn(async () => undefined);
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          update: cacheUpdate
        }));
        jest.mock("../../connectors/iot-db");
        const iotDb = require("../../connectors/iot-db");
        iotDb.updateLightData = iotDbUpdate;
        const { updateController } = require("../lights.controller");
        try {
          await updateController(lightData);
        } catch (err) {
          result = err;
        }
      });
      it("calls cache update", () => {
        expect(cacheUpdate).toHaveBeenCalledTimes(1);
        expect(cacheUpdate).toHaveBeenCalledWith(lightData.id, lightData);
      });
      it("doesn't call updateLightData", () => {
        expect(iotDbUpdate).toHaveBeenCalledTimes(0);
      });
      it("throws exception", () => {
        expect(result.message).toEqual("cache update failed");
      });
    });
  });
  describe("updateSettingsController", () => {
    describe("when cache update is successful", () => {
      const cacheUpdate = jest.fn(async () => undefined);
      describe("when db update is successful", () => {
        const iotDbUpdate = jest.fn(async () => undefined);
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            update: cacheUpdate
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.updateLightSettings = iotDbUpdate;
          const { updateSettingsController } = require("../lights.controller");
          await updateSettingsController(lightSettings);
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightSettings.id, lightSettings);
        });
        it("calls updateLightSettings", () => {
          expect(iotDbUpdate).toHaveBeenCalledTimes(1);
          expect(iotDbUpdate).toHaveBeenCalledWith(lightSettings);
        });
      });
      describe("when db update fails", () => {
        const iotDbUpdate = jest.fn(async () => {
          throw new Error("db update failed");
        });
        let result;
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            update: cacheUpdate
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.updateLightSettings = iotDbUpdate;
          const { updateSettingsController } = require("../lights.controller");
          try {
            await updateSettingsController(lightSettings);
          } catch (error) {
            result = error;
          }
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightSettings.id, lightSettings);
        });
        it("calls updateLightSettings", () => {
          expect(iotDbUpdate).toHaveBeenCalledTimes(1);
          expect(iotDbUpdate).toHaveBeenCalledWith(lightSettings);
        });
        it("throws exception", () => {
          expect(result.message).toEqual("db update failed");
        });
      });
    });
    describe("when cache update fails", () => {
      const cacheUpdate = jest.fn(async () => {
        throw new Error("cache update failed");
      });
      const iotDbUpdate = jest.fn(async () => undefined);
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          update: cacheUpdate
        }));
        jest.mock("../../connectors/iot-db");
        const iotDb = require("../../connectors/iot-db");
        iotDb.updateLightSettings = iotDbUpdate;
        const { updateSettingsController } = require("../lights.controller");
        try {
          await updateSettingsController(lightSettings);
        } catch (err) {
          result = err;
        }
      });
      it("calls cache update", () => {
        expect(cacheUpdate).toHaveBeenCalledTimes(1);
        expect(cacheUpdate).toHaveBeenCalledWith(lightSettings.id, lightSettings);
      });
      it("doesn't call updateLightSettings", () => {
        expect(iotDbUpdate).toHaveBeenCalledTimes(0);
      });
      it("throws exception", () => {
        expect(result.message).toEqual("cache update failed");
      });
    });
  });
  describe("deleteLightController", () => {
    describe("when db delete is successful", () => {
      const iotDbDelete = jest.fn(async () => undefined);
      describe("when cache delete is successful", () => {
        const cacheDelete = jest.fn(async () => undefined);
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            deleteByKey: cacheDelete
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.deleteLightById = iotDbDelete;
          const { deleteLightController } = require("../lights.controller");
          await deleteLightController({id: "abc123"});
        });
        it("calls cache delete", () => {
          expect(cacheDelete).toHaveBeenCalledTimes(2);
          expect(cacheDelete).toHaveBeenCalledWith("abc123");
          expect(cacheDelete).toHaveBeenCalledWith("lightIds");
        });
        it("calls deleteLightById", () => {
          expect(iotDbDelete).toHaveBeenCalledTimes(1);
          expect(iotDbDelete).toHaveBeenCalledWith("abc123");
        });
      });
      describe("when cache delete fails", () => {
        const cacheDelete = jest.fn(async () => {
          throw new Error("cache delete failed");
        });
        let result;
        beforeEach(async () => {
          const cache = require("../../services/cache");
          cache.getCache = jest.fn(() => ({
            deleteByKey: cacheDelete
          }));
          jest.mock("../../connectors/iot-db");
          const iotDb = require("../../connectors/iot-db");
          iotDb.deleteLightById = iotDbDelete;
          const { deleteLightController } = require("../lights.controller");
          try {
            await deleteLightController({id: "abc123"});
          } catch (error) {
            result = error;
          }
        });
        it("calls cache delete", () => {
          expect(cacheDelete).toHaveBeenCalledTimes(1);
          expect(cacheDelete).toHaveBeenCalledWith("lightIds");
        });
        it("calls deleteLightById", () => {
          expect(iotDbDelete).toHaveBeenCalledTimes(1);
          expect(iotDbDelete).toHaveBeenCalledWith("abc123");
        });
        it("throws exception", () => {
          expect(result.message).toEqual("cache delete failed");
        });
      });
    });
    describe("when db delete fails", () => {
      const iotDbDelete = jest.fn(async () => {
        throw new Error("db delete failed");
      });
      const cacheDelete = jest.fn(async () => undefined);
      let result;
      beforeEach(async () => {
        const cache = require("../../services/cache");
        cache.getCache = jest.fn(() => ({
          deleteByKey: cacheDelete
        }));
        jest.mock("../../connectors/iot-db");
        const iotDb = require("../../connectors/iot-db");
        iotDb.deleteLightById = iotDbDelete;
        const { deleteLightController } = require("../lights.controller");
        try {
          await deleteLightController({id: "abc123"});
        } catch (err) {
          result = err;
        }
      });
      it("doesn't call cache delete", () => {
        expect(cacheDelete).toHaveBeenCalledTimes(0);
      });
      it("calls deleteLightById", () => {
        expect(iotDbDelete).toHaveBeenCalledTimes(1);
        expect(iotDbDelete).toHaveBeenCalledWith("abc123");
      });
      it("throws exception", () => {
        expect(result.message).toEqual("db delete failed");
      });
    });
  });
});
