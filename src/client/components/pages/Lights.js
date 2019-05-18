import React from "react";
import Logo from "../Logo";
import TopRow from "../TopRow";
import LightsPanel from "../LightsPanel";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "../LoadingSpinner";

const Lights = props => {
  const { classes, weatherData, lightsData } = props;
  if (!lightsData) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="page">
        <Grid container className={classes.root}>
          <Logo classes={classes} />
          <TopRow classes={classes} weatherData={weatherData} />
          <LightsPanel classes={classes} lightsData={lightsData} />
        </Grid>
      </div>
    );
  }
};

export default Lights;
