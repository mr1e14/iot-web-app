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

  return (
    <React.Fragment>
      <Grid className={classes.childGridCenter} item xs={12}>
        <Typography variant="h6">Smart devices</Typography>
      </Grid>
      <Grid
        className={
          matches("sm") ? classes.childGridLeft : classes.childGridCenter
        }
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.deviceButton1}
          text="Manage lights"
          iconSrc={lightIcon}
          iconAlt="light-icon"
        />
      </Grid>
      <Grid
        className={
          matches("sm") ? classes.childGridRight : classes.childGridCenter
        }
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.deviceButton3}
          text="5 minutes ago"
          iconSrc={motionSensorIcon}
          iconAlt="motion-sensor-icon"
        />
      </Grid>
      <Grid
        className={
          matches("sm") ? classes.childGridLeft : classes.childGridCenter
        }
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.deviceButton2}
          text="House avg. 21°C"
          iconSrc={thermometerIcon}
          alt="thermometer-icon"
        />
      </Grid>
      <Grid
        className={
          matches("sm") ? classes.childGridRight : classes.childGridCenter
        }
        item
        xs={12}
        sm={6}
      >
        <DeviceButton
          className={classes.deviceButton4}
          text="House avg. 77%"
          iconSrc={humidityIcon}
          iconAlt="humidity-icon"
        />
      </Grid>
    </React.Fragment>
  );
};

export default Devices;
