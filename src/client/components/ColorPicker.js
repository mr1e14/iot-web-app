import React from "react";
import { CirclePicker } from "react-color";
import { withStyles } from "@material-ui/styles";

const styles = {
  pickerContainer: {
    display: "flex",
    justifyContent: "center"
  }
};

const ColorPicker = props => {
  const { isXs, containerWidth, handleColorChange } = props;
  const circleSpacing = isXs ? 6 : 8;
  const circleSize = isXs ? 20 : 26;

  return (
    <div className={props.classes.pickerContainer}>
      <CirclePicker
        colors={props.colors}
        width={containerWidth}
        circleSize={circleSize}
        circleSpacing={circleSpacing}
        onChangeComplete={handleColorChange}
      />
    </div>
  );
};

export default withStyles(styles)(ColorPicker);
