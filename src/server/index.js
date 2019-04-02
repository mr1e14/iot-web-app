require("dotenv").config();
const express = require("express");
const { getWeatherData } = require("./connectors/dark-sky-api");

const app = express();

app.use(express.static("dist"));

app.get("/api/getWeatherData", async (req, res) => {
  // TODO logging service?
  let weatherData = null;
  try {
    weatherData = await getWeatherData();
  } catch (err) {
    console.log(err);
  }
  res.send({ weatherData });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
