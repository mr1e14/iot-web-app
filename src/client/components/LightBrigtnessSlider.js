import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    width: "100%"
  },
  slider: {
    padding: "22px 0px"
  },
  track: {
    height: "8px",
    backgroundColor: "#1a1a1a"
  },
  thumb: {
    width: "22px",
    height: "22px",
    backgroundColor: "#1a1a1a"
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
      <div className={classes.root}>
        <Slider
          classes={{
            container: classes.slider,
            track: classes.track,
            thumb: classes.thumb
          }}
          value={value}
          onChange={this.handleChange}
          disabled={!on || !connected}
        />
      </div>
    );
  }
}

export default withStyles(styles)(LightBrightnessSlider);
