import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import LightOverview from "./LightOverview";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";
import LoadingSpinner from "./LoadingSpinner";

class LightsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightIds: null
    };
  }

  componentDidMount() {
    fetch("/api/lights/getLightIds")
      .then(res => res.json())
      .then(res => this.setState({ lightIds: res.lightIds }));
  }

  render() {
    const { classes, isMd } = this.props;
    const { lightIds } = this.state;
    return lightIds === null ? (
      <LoadingSpinner />
    ) : (
      <Grid container className={classes.lightsPanel}>
        <Grid item xs={12}>
          <Typography color="textPrimary" variant="h6">
            Manage lights
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-between"
          className={classes.child}
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
          spacing={isMd ? 2 : 1}
          justify={lightIds.length > 1 ? "flex-start" : "center"}
        >
          {this.state.lightIds.map((id, key) => (
            <Grid item xs={12} sm={6} key={key}>
              <LightOverview id={id} classes={classes} key={id} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default LightsPanel;
