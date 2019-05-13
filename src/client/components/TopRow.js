import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WeatherWidget from "./WeatherWidget";

const TopRow = props => (
  <Grid
    container
    direction="row"
    alignItems="flex-start"
    justify="space-between"
  >
    <Grid className={props.classes.child}>
      <WeatherWidget {...props} />
    </Grid>
    <Grid className={props.classes.child}>
      <Button
        variant="outlined"
        classes={{ label: props.classes.buttonLabel }}
        size="large"
        color="secondary"
      >
        <Typography color="textPrimary">Sign in</Typography>
      </Button>
    </Grid>
  </Grid>
);

export default TopRow;
