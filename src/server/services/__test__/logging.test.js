jest.mock("winston");

const { createLogger, format, transports } = require("winston");

format.colorize = jest.fn();
format.timestamp = jest.fn();
format.simple = jest.fn();
format.printf = jest.fn();
format.combine = jest.fn();
transports.Console = jest.fn();

const info = jest.fn();
const warn = jest.fn();
const error = jest.fn();
const add = jest.fn();

createLogger.mockImplementation(() => {
  return { info, warn, error, add };
});

const logger = require("../logging")("my_module");

describe("logging", () => {
  describe("Function: info", () => {
    it("should print message in correct format", () => {
      logger.info("myFunction", "my info message");
      expect(info).toHaveBeenCalledWith(
        "my_module - myFunction - my info message"
      );
    });
  });
  describe("Function: warn", () => {
    it("should print message in correct format", () => {
      logger.warn("myFunction", "my warning");
      expect(warn).toHaveBeenCalledWith("my_module - myFunction - my warning");
    });
  });
  describe("Function: error", () => {
    it("should print message in correct format", () => {
      const errorStack = "myFunction at line 56 \n otherFunction at line 25";
      logger.error("myFunction", "my error message", { stack: errorStack });
      expect(error).toHaveBeenCalledWith(
        "my_module - myFunction - my error message - myFunction at line 56 \n otherFunction at line 25"
      );
    });
  });
});
