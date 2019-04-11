import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import lightIcon from "../img/light.png";
import thermometerIcon from "../img/thermometer.png";
import humidityIcon from "../img/humidity.png";
import motionSensorIcon from "../img/motion-sensor.png";
import matches from "../mediaQuery";
import DeviceButton from "./DeviceButton";

const Devices = props => {
  const { classes } = props;

  const isXs = matches("xs");

  return (
    <React.Fragment>
      <Grid className={classes.childGridCenter} item xs={12}>
        <Typography variant="h6">Smart devices</Typography>
      </Grid>
      <Grid
        className={isXs ? classes.child : classes.childGridLeft}
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.button1}
          text="Manage lights"
          iconSrc={lightIcon}
          iconAlt="light-icon"
        />
      </Grid>
      <Grid
        className={isXs ? classes.child : classes.childGridRight}
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.button3}
          text="5 minutes ago"
          iconSrc={motionSensorIcon}
          iconAlt="motion-sensor-icon"
        />
      </Grid>
      <Grid
        className={isXs ? classes.child : classes.childGridLeft}
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.button2}
          text="House avg. 21°C"
          iconSrc={thermometerIcon}
          alt="thermometer-icon"
        />
      </Grid>
      <Grid
        className={isXs ? classes.child : classes.childGridRight}
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.button4}
          text="House avg. 77%"
          iconSrc={humidityIcon}
          iconAlt="humidity-icon"
        />
      </Grid>
    </React.Fragment>
  );
};

export default Devices;
