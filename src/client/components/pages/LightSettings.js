import React from "react";
import PropTypes from "prop-types";
import Logo from "../Logo";
import LightSettingsPanel from "../LightSettingsPanel";
import Grid from "@material-ui/core/Grid";

const LightSettings = props => {
  const {
    classes,
    match: {
      params: { id }
    },
    config
  } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <LightSettingsPanel classes={classes} id={id} config={config} />
      </Grid>
    </div>
  );
};

LightSettings.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default LightSettings;
