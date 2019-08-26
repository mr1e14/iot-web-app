import React from "react";
import Logo from "../Logo";
import LightController from "../LightController";
import Grid from "@material-ui/core/Grid";

const getLightData = (lightsData, id) => {
  let lightData = null;
  lightsData.forEach(data => {
    if (data.id === id) {
      lightData = data;
    }
  });
  return lightData;
};

const LightView = props => {
  const {
    classes,
    match: {
      params: { id }
    },
    lightsData
  } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <LightController
          classes={classes}
          id={id}
          lightData={getLightData(lightsData, id)}
        />
      </Grid>
    </div>
  );
};

export default LightView;
