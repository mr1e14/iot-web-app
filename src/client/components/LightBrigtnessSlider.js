import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Slider from "@material-ui/core/Slider";
import debounce from "awesome-debounce-promise";
import { SLIDER_DEBOUNCE_TIME } from "../config";

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
    this.state = {};
    this.saveBrightness = debounce(
      newValue => this.props.handleChange(newValue),
      SLIDER_DEBOUNCE_TIME
    );
  }

  handleCurrentValueChange = (event, value) => {
    this.setState(
      { currentValue: value },
      async () => await this.saveBrightness(value)
    );
  };

  render() {
    const { classes, on, brightness } = this.props;
    const { currentValue } = this.state;
    return (
      <div className={classes.root}>
        <Slider
          className={classes.slider}
          classes={{
            track: classes.track,
            thumb: classes.thumb
          }}
          value={currentValue || brightness}
          onChange={this.handleCurrentValueChange}
          disabled={!on}
          min={1}
        />
      </div>
    );
  }
}

LightBrightnessSlider.defaultProps = {
  brightness: 1,
  on: false
};

LightBrightnessSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  on: PropTypes.bool,
  connected: PropTypes.bool,
  brightness: PropTypes.number
};

export default withStyles(styles)(LightBrightnessSlider);
