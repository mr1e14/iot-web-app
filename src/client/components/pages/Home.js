import React from "react";
import Logo from "../Logo";
import TopRow from "../TopRow";
import Devices from "../Devices";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "../LoadingSpinner";

const Home = props => {
  const { weatherData, classes } = props;
  if (weatherData === undefined) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="page">
        <Grid container className={classes.root}>
          <Logo classes={classes} />
          <TopRow classes={classes} weatherData={weatherData} />
          <Devices {...props} />
        </Grid>
      </div>
    );
  }
};

export default Home;
