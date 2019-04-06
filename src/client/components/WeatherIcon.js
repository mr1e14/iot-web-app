import React from "react";
import matches from "../mediaQuery";
import clearDay from "../img/clear-day.png";
import clearNight from "../img/clear-night.png";
import cloudy from "../img/cloudy.png";
import defaultIcon from "../img/default.png";
import fog from "../img/fog.png";
import partlyCloudDay from "../img/partly-cloudy-day.png";
import partlyCloudyNight from "../img/partly-cloudy-night.png";
import rain from "../img/rain.png";
import sleet from "../img/sleet.png";
import snow from "../img/snow.png";
import thunderstorm from "../img/thunderstorm.png";
import tornado from "../img/tornado.png";
import wind from "../img/wind.png";

const icons = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  cloudy,
  defaultIcon,
  fog,
  "partly-cloudy-day": partlyCloudDay,
  "partly-cloudy-night": partlyCloudyNight,
  rain,
  sleet,
  snow,
  thunderstorm,
  tornado,
  wind
};

const WeatherIcon = props => {
  const icon = props.weatherData ? props.weatherData.icon : "defaultIcon";
  const iconSize = matches("xs") ? "48px" : "64px";
  return (
    <img
      style={{ marginRight: "0.5rem" }}
      src={icons[icon]}
      height={iconSize}
      alt="weather-icon"
      align="middle"
    />
  );
};

export default WeatherIcon;
