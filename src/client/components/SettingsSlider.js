import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { splitSecondsToParts } from "./deviceFunctions";

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: "center"
  },
  root: {
    width: "100px",
    [theme.breakpoints.up("sm")]: {
      width: "150px"
    },
    [theme.breakpoints.up("md")]: {
      width: "220px"
    }
  },
  slider: {
    padding: "16px 0",
    [theme.breakpoints.up("sm")]: {
      padding: "24px 0"
    }
  }
}));

const SettingsSlider = props => {
  const { min, max, value, onChange, step } = props;
  const [currentValue, setValue] = useState(value);
  const classes = useStyles();

  const { h, m, s } = splitSecondsToParts(currentValue);
  const hrs = h > 0 ? `${h}hr ` : "";
  const mins = m > 0 ? `${m}min ` : "";
  const secs = s > 0 ? `${s}s` : "";

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Slider
          className={classes.slider}
          classes={{
            track: classes.track,
            thumb: classes.thumb
          }}
          value={currentValue}
          onChange={(e, v) => setValue(v)}
          onChangeCommitted={onChange}
          color="secondary"
          min={min}
          max={max}
          step={step}
        />
      </div>
      <Typography
        className={classes.textCenter}
        variant="caption"
        color="textSecondary"
      >
        {hrs + mins + secs}
      </Typography>
    </div>
  );
};

export default SettingsSlider;

SettingsSlider.defaultProps = {
  value: 0
};
