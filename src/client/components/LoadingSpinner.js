import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";

const styles = {
  spinnerContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
};

const LoadingSpinner = props => (
  <div className={props.classes.spinnerContainer}>
    <CircularProgress color="secondary" />
  </div>
);

LoadingSpinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingSpinner);
