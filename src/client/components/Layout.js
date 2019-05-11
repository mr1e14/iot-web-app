import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WeatherWidget from "./WeatherWidget";
import LoadingSpinner from "./LoadingSpinner";
import Devices from "./Devices";
import Logo from "./Logo";

const Layout = props => {
  const { classes, weatherData } = props;

  if (!weatherData) {
    return <LoadingSpinner />;
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
              color="primary"
            >
              <Typography color="textPrimary">Sign in</Typography>
            </Button>
          </Grid>
        </Grid>
        <Devices {...props} />
      </Grid>
    );
  }
};

export default Layout;
