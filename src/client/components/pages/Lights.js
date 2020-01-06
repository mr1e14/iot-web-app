import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import LightsPanel from "../LightsPanel";
import Grid from "@material-ui/core/Grid";
import matches from "../mediaQuery";

const Lights = props => {
  const { classes } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <LightsPanel classes={classes} isMd={matches("md")} />
      </Grid>
    </div>
  );
};

Lights.propTypes = {
  classes: PropTypes.object.isRequired,
  weatherData: PropTypes.object
};

export default Lights;
