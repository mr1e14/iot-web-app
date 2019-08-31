import React from "react";
import { withStyles } from "@material-ui/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    margin: "0 3px"
  },
  slider: {
    padding: "24px 0"
  },
  track: {
    height: "6px"
  },
  thumb: {
    width: "16px",
    height: "16px"
  }
};

class LightBrightnessSlider extends React.Component {
  render() {
    const { classes, on, connected, brightness, handleChange } = this.props;

    return (
      <div className={classes.root}>
        <Slider
          className={classes.slider}
          classes={{
            track: classes.track,
            thumb: classes.thumb
          }}
          value={brightness}
          onChange={handleChange}
          disabled={!on || !connected}
          min={1}
        />
      </div>
    );
  }
}

LightBrightnessSlider.defaultProps = {
  brightness: 1,
  on: false,
  connected: false
};

export default withStyles(styles)(LightBrightnessSlider);
