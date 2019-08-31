import React from "react";
import Logo from "../Logo";
import TopRow from "../TopRow";
import LightsPanel from "../LightsPanel";
import Grid from "@material-ui/core/Grid";
import matches from "../mediaQuery";

const Lights = props => {
  const { classes, weatherData } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <TopRow classes={classes} weatherData={weatherData} />
        <LightsPanel classes={classes} isMd={matches("md")} />
      </Grid>
    </div>
  );
};

export default Lights;
