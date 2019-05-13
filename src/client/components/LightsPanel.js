import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LightOverview from "./LightOverview";
import matches from "./mediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";

const Lights = props => {
  const lights = [];

  for (let i in props.data) {
    lights.push(
      <LightOverview data={props.data[i]} classes={props.classes} key={i} />
    );
  }
  return lights;
};

const LightsPanel = props => (
  <Grid container className={props.classes.lightsPanel}>
    <Grid item xs={12}>
      <Typography variant="h6">Manage lights</Typography>
    </Grid>
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      justify="space-between"
      className={props.classes.child}
    >
      <Grid item>
        <IconButton color="secondary">
          <MaterialIcon iconName="arrow_back" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton color="secondary">
          <MaterialIcon iconName="add_circle" />
        </IconButton>
      </Grid>
    </Grid>
    <Lights {...props} />
  </Grid>
);

export default LightsPanel;
