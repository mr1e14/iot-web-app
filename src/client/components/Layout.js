import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MaterialIcon } from "./";
import { WeatherWidget } from "./";

const Layout = props => {
  const { classes, weatherData } = props;

  if (!weatherData) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid className={classes.child} item xs={12}>
            <h1>Hi</h1>
            <WeatherWidget {...props} />
          </Grid>
          <Grid className={classes.child} item xs={12} sm={6}>
            <Typography color="primary">
              <span>xs=12 sm=6</span>
            </Typography>
          </Grid>
          <Grid className={classes.child} item xs={12} sm={6}>
            <MaterialIcon iconName="account_circle" />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Layout;
