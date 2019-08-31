import React from "react";
import Logo from "../Logo";
import LightController from "../LightController";
import Grid from "@material-ui/core/Grid";
import matches from "../mediaQuery";

const LightView = props => {
  const {
    classes,
    match: {
      params: { id }
    },
    supportedColors
  } = props;
  return (
    <div className="page">
      <Grid container className={classes.root}>
        <Logo classes={classes} />
        <LightController
          classes={classes}
          id={id}
          isXs={!matches("sm")}
          supportedColors={supportedColors}
        />
      </Grid>
    </div>
  );
};

export default LightView;
