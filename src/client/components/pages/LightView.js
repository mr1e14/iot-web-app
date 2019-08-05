import React from "react";
import Logo from "../Logo";
import LightController from "../LightController";
import Grid from "@material-ui/core/Grid";

const LightView = props => {
  const {
    classes,
    match: { params }
  } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <LightController classes={classes} id={params.id} />
      </Grid>
    </div>
  );
};

export default LightView;
