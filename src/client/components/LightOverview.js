import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/styles";
import LightBrightnessSlider from "./LightBrigtnessSlider";
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
    const { classes, data, theme } = this.props;
    return (
      <Grid
        style={{
          background: `linear-gradient(45deg, ${data.color ||
            theme.palette.primary.main} 35%, rgb(242,242,242) 90%)`,
          opacity: on ? 1 : 0.2,
          cursor: connected ? "pointer" : "no-drop"
        }}
        container
        alignItems="center"
        className={classes.lightRow}
      >
        <Grid item xs={10}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!connected}
          >
            <Typography>{data.name}</Typography>
          </Button>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color="primary"
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

export default withTheme(LightOverview);
