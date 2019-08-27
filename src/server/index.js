require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("./services/logging")("index");
const { apiRouter } = require("./routes/api.router");

const app = express();

app.use(express.static("dist"));

app.use("/api", apiRouter());

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.listen(process.env.PORT || 8080, () =>
  logger.info("app.listen", `Listening on port ${process.env.PORT || 8080}!`)
);
