const { createLogger, format, transports } = require("winston");
const colorizer = format.colorize();
require("winston-daily-rotate-file");
const { LOG_DIR } = require("../config");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.simple(),
    format.printf(msg => `${msg.timestamp} - ${msg.level}:  ${msg.message}`)
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: "app.log.%DATE%",
      dirname: LOG_DIR
    }),
    new transports.DailyRotateFile({
      level: "error",
      filename: "error.log.%DATE%",
      dirname: LOG_DIR
    })
  ]
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.printf(msg =>
        colorizer.colorize(
          msg.level,
          `${msg.timestamp} - ${msg.level}: ${msg.message}`
        )
      )
    })
  );
}

const getLogger = moduleName => {
  const info = (functionCall, message) => {
    logger.info(`${moduleName} - ${functionCall} - ${message}`);
  };
  const warn = (functionCall, message) => {
    logger.warn(`${moduleName} - ${functionCall} - ${message}`);
  };
  const error = (functionCall, message, error) => {
    logger.error(
      `${moduleName} - ${functionCall} - ${message} - ${error.stack}`
    );
  };

  return { info, warn, error };
};

module.exports = getLogger;
