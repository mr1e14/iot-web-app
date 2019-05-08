import React from "react";
import Grid from "@material-ui/core/Grid";
import logo from "../img/logo.png";

const Logo = props => {
  const { classes } = props;
  return (
    <Grid className={classes.childGridCenter} item xs={12}>
      <img src={logo} alt="logo" />
    </Grid>
  );
};

export default Logo;
