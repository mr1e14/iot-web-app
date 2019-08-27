import React from "react";
import { CirclePicker } from "react-color";
import matches from "./mediaQuery";
import { withStyles } from "@material-ui/styles";

const styles = {
  pickerContainer: {
    display: "flex",
    justifyContent: "center"
  }
};


const ColorPicker = props => {
  const isXs = !matches("sm");
  const pickerWidth = isXs ? "260px" : "520px";
  const circleSpacing = isXs ? 6 : 8;
  const circleSize = isXs ? 20 : 26;

  return (
    <div className={props.classes.pickerContainer}>
      <CirclePicker
        colors={props.colors}
        width={pickerWidth}
        circleSize={circleSize}
        circleSpacing={circleSpacing}
      />
    </div>
  );
};

export default withStyles(styles)(ColorPicker);
