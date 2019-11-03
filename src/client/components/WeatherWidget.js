import React from "react";
import Typography from "@material-ui/core/Typography";
import WeatherIcon from "./WeatherIcon";
import matches from "./mediaQuery";

const WeatherWidget = props => {
  const { weatherData } = props;
  const temperature = weatherData
    ? parseInt(weatherData.temperature, 10).toString() + "°C"
    : "";
  const humidity = weatherData
    ? " / " + (weatherData.humidity * 100).toString() + "%"
    : "";
  return (
    <React.Fragment>
      <Typography color="textPrimary" component="span" variant="caption">
        <WeatherIcon {...props} />
        <span>
          {temperature}
          {matches("sm") && humidity}
        </span>
      </Typography>
    </React.Fragment>
  );
};

export default WeatherWidget;
