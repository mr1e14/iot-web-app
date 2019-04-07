import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MaterialIcon, WeatherWidget, Devices } from "./";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../img/logo.png";
import lightIcon from "../img/light.png";

const pageCentre = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const Layout = props => {
  const { classes, weatherData } = props;

  if (!weatherData) {
    return (
      <div style={pageCentre}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Grid container className={classes.root}>
        <Grid className={classes.childGridCenter} item xs={12}>
          <img src={logo} alt="logo" />
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
        >
          <Grid className={classes.childGridLeft}>
            <WeatherWidget {...props} />
          </Grid>
          <Grid className={classes.childGridRight}>
            <MaterialIcon iconName="account_circle" />
          </Grid>
        </Grid>
        <Devices {...props} />
      </Grid>
    );
  }
};

export default Layout;
