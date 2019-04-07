import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MaterialIcon } from "./";
import { WeatherWidget } from "./";
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
        <Grid className={classes.childGridCenter} item xs={12}>
          <Typography variant="subtitle1">Smart devices</Typography>
        </Grid>
        <Grid className={classes.childGridLeft} item xs={6}>
          <Button fullWidth={true} className={classes.button1} elevation={20}>
            <Typography>Some text here</Typography>
            <img src={lightIcon} />
          </Button>
        </Grid>
        <Grid className={classes.childGridRight} item xs={6}>
          <Button fullWidth={true} className={classes.button2} elevation={17}>
            <Typography>Some text here</Typography>
            <img src={lightIcon} />
          </Button>
        </Grid>
        <Grid className={classes.childGridLeft} item xs={6}>
          <Button fullWidth={true} className={classes.button3} elevation={20}>
            <Typography>Some text here</Typography> <img src={lightIcon} />
          </Button>
        </Grid>
        <Grid className={classes.childGridRight} item xs={6}>
          <Button fullWidth={true} className={classes.button4} elevation={17}>
            <Typography>Some text here</Typography>
            <img src={lightIcon} />
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default Layout;
