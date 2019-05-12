import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import matches from "./mediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";

class LightOverview extends React.Component {
  state = {
    connected: this.props.data.connected,
    on: this.props.data.on,
    brightness: this.props.data.brightness
  };

  handleToggleClick = event => {
    this.setState({ on: !this.state.on });
  };

  render() {
    const { on, connected } = this.state;
    const { classes, data } = this.props;
    return (
      <Grid
        style={{
          background: `linear-gradient(45deg, ${
            data.color
          } 30%, rgb(242,242,242) 90%)`,
          opacity: on ? 1 : 0.2
        }}
        container
        alignItems="center"
        className={classes.lightRow}
      >
        <Grid item xs={10} sm={11}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!connected}
          >
            <Typography>{data.name}</Typography>
          </Button>
        </Grid>
        <Grid item xs={2} sm={1}>
          <IconButton
            color="secondary"
            disabled={!connected}
            onClick={this.handleToggleClick}
          >
            <MaterialIcon
              iconName={
                this.state.connected ? "power_settings_new" : "power_off"
              }
            />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <LightBrightnessSlider {...this.state} />
        </Grid>
      </Grid>
    );
  }
}

export default LightOverview;
