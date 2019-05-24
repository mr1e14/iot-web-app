import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import lightIcon from "../img/light.png";
import thermometerIcon from "../img/thermometer.png";
import humidityIcon from "../img/humidity.png";
import motionSensorIcon from "../img/motion-sensor.png";
import matches from "./mediaQuery";
import DeviceButton from "./DeviceButton";

const Devices = props => {
  const { classes } = props;
  const spacing = matches("md") ? 3 : 2;
  return (
    <Grid container spacing={spacing}>
      <Grid className={classes.child} item xs={12}>
        <Typography color="textPrimary" variant="h6">
          Smart devices
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceButton
          className={classes.deviceButton1}
          text="Manage lights"
          linkTo="/lights"
          iconSrc={lightIcon}
          iconAlt="light-icon"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceButton
          className={classes.deviceButton3}
          text="5 minutes ago"
          linkTo={"/motion-sensor"}
          iconSrc={motionSensorIcon}
          iconAlt="motion-sensor-icon"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceButton
          className={classes.deviceButton2}
          text="House avg. 21°C"
          linkTo="/temperature"
          iconSrc={thermometerIcon}
          alt="thermometer-icon"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DeviceButton
          className={classes.deviceButton4}
          text="House avg. 77%"
          linkTo="/humidity"
          iconSrc={humidityIcon}
          iconAlt="humidity-icon"
        />
      </Grid>
    </Grid>
  );
};

export default Devices;
