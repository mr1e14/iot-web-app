import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  container: {
    padding: "24px 0",
    margin: "0 3px"
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
  state = {
    value: this.props.brightness
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, on, connected } = this.props;
    const { value } = this.state;

    return (
      <Slider
        classes={{
          container: classes.container,
          track: classes.track,
          thumb: classes.thumb
        }}
        value={value}
        onChange={this.handleChange}
        disabled={!on || !connected}
        min={1}
      />
    );
  }
}

export default withStyles(styles)(LightBrightnessSlider);
