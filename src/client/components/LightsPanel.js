import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import LightOverview from "./LightOverview";
import matches from "./mediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";

const Lights = props => {
  const lights = [];

  for (let i in props.lightsData) {
    lights.push(
      <Grid item xs={12} sm={6} key={i}>
        <LightOverview
          data={props.lightsData[i]}
          classes={props.classes}
          key={i}
        />
      </Grid>
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
        <IconButton component={Link} to="/" color="secondary">
          <MaterialIcon iconName="arrow_back" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton color="secondary">
          <MaterialIcon iconName="add_circle" />
        </IconButton>
      </Grid>
    </Grid>
    <Grid
      container
      spacing={matches("md") ? 24 : 16}
      justify={props.lightsData.length > 1 ? "flex-start" : "center"}
    >
      <Lights {...props} />
    </Grid>
  </Grid>
);

export default LightsPanel;
