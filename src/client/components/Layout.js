import React from "react";
import MaterialIcon from "./MaterialIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Layout = props => {
  const { weatherData, classes } = props;
  const temperature = weatherData ? parseInt(weatherData.temperature) : "";
  const humidity = weatherData
    ? parseInt(weatherData.humidity * 100) + "%"
    : "";

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid className={classes.child} item xs={12}>
          <h1>{`Temp: ${temperature}, hum: ${humidity}`}</h1>
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
};

export default Layout;
