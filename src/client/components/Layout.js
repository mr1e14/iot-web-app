import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import WeatherWidget from "./WeatherWidget";
import Devices from "./Devices";
import Logo from "./Logo";

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
        <Logo {...props} />
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
            <Button
              variant="outlined"
              classes={{ label: classes.buttonLabel }}
              size="large"
              color="secondary"
            >
              <Typography color="textPrimary">{"Sign in"}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Devices {...props} />
      </Grid>
    );
  }
};

export default Layout;
