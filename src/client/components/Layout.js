import React from "react";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "./LoadingSpinner";
import Devices from "./Devices";
import Logo from "./Logo";
import TopRow from "./TopRow";

const Layout = props => {
  const { classes, weatherData } = props;

  if (!weatherData) {
    return <LoadingSpinner />;
  } else {
    return (
      <Grid container className={classes.root}>
        <Logo {...props} />
        <TopRow {...props} />
        <Devices {...props} />
      </Grid>
    );
  }
};

export default Layout;
