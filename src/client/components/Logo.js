import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import logo from "../img/logo.png";

const Logo = props => {
  return (
    <Grid className={props.classes.child} item xs={12}>
      <img src={logo} alt="logo" />
    </Grid>
  );
};

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Logo;
