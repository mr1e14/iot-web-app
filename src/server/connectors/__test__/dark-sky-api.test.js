jest.mock("request-promise-native");

const { getWeatherData } = require("../dark-sky-api");
const rp = require("request-promise-native");

const validAPIResponse = JSON.stringify({
  currently: {
    temperature: 15,
    humidity: 0.7,
    icon: "partly-cloudy"
  }
});
const validJSONResult = JSON.parse(validAPIResponse).currently;

describe("Function: getWeatherData", () => {
  let result;
  describe("given the request is successful", () => {
    beforeEach(async () => {
      rp.mockImplementation(() => {
        return Promise.resolve(validAPIResponse);
      });
      result = await getWeatherData();
    });
    it("should return valid JSON response", () => {
      expect(result).toEqual(validJSONResult);
    });
  });
  describe("given the request returns unexpected response", () => {
    beforeEach(async () => {
      rp.mockImplementation(() => {
        return Promise.resolve("null");
      });
    });
    it("should throw an error transforming API response", async () => {
      await expect(getWeatherData()).rejects.toThrow();
    });
  });
  describe("given the request results in an error", () => {
    beforeEach(async () => {
      rp.mockImplementation(() => {
        throw new Error("403 Forbidden");
      });
      try {
        await getWeatherData();
      } catch (error) {
        result = error;
      }
    });
    it("should throw the error raised by request-promise-native", () => {
      expect(result.message).toBe("403 Forbidden");
    });
  });
});
