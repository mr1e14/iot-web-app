import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { MaterialIcon } from "./";
import { WeatherWidget } from "./";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../img/logo.png";

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
        <Grid className={classes.child} item xs={12}>
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
        <Grid className={classes.childGridLeft} item xs={6}>
          <Paper className={classes.paper1} elevation={1}>
            <Typography>asaad</Typography>
          </Paper>
        </Grid>
        <Grid className={classes.childGridRight} item xs={6}>
          <Paper className={classes.paper2} elevation={1}>
            <Typography>of paper</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Layout;
