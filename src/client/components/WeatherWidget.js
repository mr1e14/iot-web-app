import React from "react";
import Typography from "@material-ui/core/Typography";
import WeatherIcon from "./WeatherIcon";
import matches from "./mediaQuery";

const WeatherWidget = props => {
  const { weatherData } = props;
  const temperature = weatherData ? parseInt(weatherData.temperature) : "";
  const humidity = weatherData ? parseInt(weatherData.humidity * 100) : "";
  return (
    <React.Fragment>
      <Typography color="textPrimary" component="span" variant="caption">
        <WeatherIcon {...props} />
        <span>
          {`${temperature}°C`}
          {matches("sm") ? ` / ${humidity}%` : null}
        </span>
      </Typography>
    </React.Fragment>
  );
};

export default WeatherWidget;
