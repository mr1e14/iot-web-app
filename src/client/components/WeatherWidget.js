import React from "react";
import Typography from "@material-ui/core/Typography";
import { WeatherIcon } from "./";

const WeatherWidget = props => {
  const { weatherData } = props;
  const temperature = weatherData ? parseInt(weatherData.temperature) : "";
  const humidity = weatherData ? parseInt(weatherData.humidity * 100) : "";
  return (
    <React.Fragment>
      <WeatherIcon {...props} />
      <Typography color="secondary">
        <span>
          {temperature}° | {humidity}%
        </span>
      </Typography>
    </React.Fragment>
  );
};

export default WeatherWidget;
