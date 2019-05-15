import React from "react";
import Logo from "../Logo";
import TopRow from "../TopRow";
import LightsPanel from "../LightsPanel";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "../LoadingSpinner";

const Lights = props => {
  const { classes, lightsData, weatherData } = props;
  if (!props.lightsData) {
    return <LoadingSpinner />;
  } else {
    return (
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <TopRow classes={classes} weatherData={weatherData} />
        <LightsPanel classes={classes} lightsData={lightsData} />
      </Grid>
    );
  }
};

export default Lights;
