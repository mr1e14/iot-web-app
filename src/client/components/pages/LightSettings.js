import React from "react";
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

export default LightSettings;
