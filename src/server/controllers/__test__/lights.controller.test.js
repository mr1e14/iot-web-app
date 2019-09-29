jest.mock("../../services/logging", () => {
  return jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    error:   jest.fn()
  }));
});

const mockGetCache = jest.fn();
jest.mock("../../services/cache", () => ({
  getCache: mockGetCache
}));

const mockUpdateLightData = jest.fn(),
  mockUpdateLightSettings = jest.fn(),
  mockDeleteByLightId = jest.fn();

jest.mock("../../connectors/iot-db", () => ({
  updateLightData: mockUpdateLightData,
  updateLightSettings: mockUpdateLightSettings,
  deleteLightById: mockDeleteByLightId
}));

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
        mockGetCache.mockImplementation(() => ({
           get: async () => lightData
        }))
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        mockGetCache.mockImplementation(() => ({
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
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            update: cacheUpdate
          }));
          const { updateController } = require("../lights.controller");
          await updateController(lightData);
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightData.id, lightData);
        });
        it("calls updateLightData", () => {
          expect(mockUpdateLightData).toHaveBeenCalledTimes(1);
          expect(mockUpdateLightData).toHaveBeenCalledWith(lightData);
        });
      });
      describe("when db update fails", () => {
        let result;
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            update: cacheUpdate
          }));
          mockUpdateLightData.mockImplementation((async () => {
            throw new Error("db update failed");
          }));
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
          expect(mockUpdateLightData).toHaveBeenCalledTimes(1);
          expect(mockUpdateLightData).toHaveBeenCalledWith(lightData);
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
      let result;
      beforeEach(async () => {
        mockGetCache.mockImplementation(() => ({
          update: cacheUpdate
        }));
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
        expect(mockUpdateLightData).toHaveBeenCalledTimes(0);
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
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            update: cacheUpdate
          }));
          const { updateSettingsController } = require("../lights.controller");
          await updateSettingsController(lightSettings);
        });
        it("calls cache update", () => {
          expect(cacheUpdate).toHaveBeenCalledTimes(1);
          expect(cacheUpdate).toHaveBeenCalledWith(lightSettings.id, lightSettings);
        });
        it("calls updateLightSettings", () => {
          expect(mockUpdateLightSettings).toHaveBeenCalledTimes(1);
          expect(mockUpdateLightSettings).toHaveBeenCalledWith(lightSettings);
        });
      });
      describe("when db update fails", () => {
        let result;
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            update: cacheUpdate
          }));
          mockUpdateLightSettings.mockImplementation(async () => {
            throw new Error("db update failed");
          });
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
          expect(mockUpdateLightSettings).toHaveBeenCalledTimes(1);
          expect(mockUpdateLightSettings).toHaveBeenCalledWith(lightSettings);
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
      let result;
      beforeEach(async () => {
        mockGetCache.mockImplementation(() => ({
          update: cacheUpdate
        }));
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
        expect(mockUpdateLightSettings).toHaveBeenCalledTimes(0);
      });
      it("throws exception", () => {
        expect(result.message).toEqual("cache update failed");
      });
    });
  });
  describe("deleteLightController", () => {
    describe("when db delete is successful", () => {
      mockDeleteByLightId.mockImplementation(async () => undefined);
      describe("when cache delete is successful", () => {
        const cacheDelete = jest.fn(async () => undefined);
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            deleteByKey: cacheDelete
          }));
          const { deleteLightController } = require("../lights.controller");
          await deleteLightController({id: "abc123"});
        });
        it("calls cache delete", () => {
          expect(cacheDelete).toHaveBeenCalledTimes(2);
          expect(cacheDelete).toHaveBeenCalledWith("abc123");
          expect(cacheDelete).toHaveBeenCalledWith("lightIds");
        });
        it("calls deleteLightById", () => {
          expect(mockDeleteByLightId).toHaveBeenCalledTimes(1);
          expect(mockDeleteByLightId).toHaveBeenCalledWith("abc123");
        });
      });
      describe("when cache delete fails", () => {
        const cacheDelete = jest.fn(async () => {
          throw new Error("cache delete failed");
        });
        let result;
        beforeEach(async () => {
          mockGetCache.mockImplementation(() => ({
            deleteByKey: cacheDelete
          }));
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
          expect(mockDeleteByLightId).toHaveBeenCalledTimes(1);
          expect(mockDeleteByLightId).toHaveBeenCalledWith("abc123");
        });
        it("throws exception", () => {
          expect(result.message).toEqual("cache delete failed");
        });
      });
    });
    describe("when db delete fails", () => {
      const cacheDelete = jest.fn(async () => undefined);
      let result;
      beforeEach(async () => {
        mockGetCache.mockImplementation(() => ({
          deleteByKey: cacheDelete
        }));
        mockDeleteByLightId.mockImplementation(async () => {
          throw new Error("db delete failed");
        });
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
        expect(mockDeleteByLightId).toHaveBeenCalledTimes(1);
        expect(mockDeleteByLightId).toHaveBeenCalledWith("abc123");
      });
      it("throws exception", () => {
        expect(result.message).toEqual("db delete failed");
      });
    });
  });
});
