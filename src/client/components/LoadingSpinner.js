import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

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
    <CircularProgress />;
  </div>
);

export default withStyles(styles)(LoadingSpinner);
