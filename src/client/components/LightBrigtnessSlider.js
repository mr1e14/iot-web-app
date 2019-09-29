import React from "react";
import { withStyles } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";

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
  constructor(props) {
    super(props);
    this.state = { currentValue: this.props.brightness };
  }

  handleCurrentValueChange = (event, value) => {
    this.setState({ currentValue: value });
  };

  render() {
    const { classes, on, connected, handleChange } = this.props;
    const { currentValue } = this.state;
    return (
      <div className={classes.root}>
        <Slider
          className={classes.slider}
          classes={{
            track: classes.track,
            thumb: classes.thumb
          }}
          value={currentValue}
          onChange={this.handleCurrentValueChange}
          onChangeCommitted={handleChange}
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
