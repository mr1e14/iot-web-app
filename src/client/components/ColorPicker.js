import React from "react";
import PropTypes from "prop-types";
import { CirclePicker } from "react-color";
import { withStyles } from "@material-ui/styles";

const styles = {
  pickerContainer: {
    display: "flex",
    justifyContent: "center"
  }
};

const ColorPicker = props => {
  const { isXs, containerWidth, handleColorChange, colors } = props;
  const circleSpacing = isXs ? 6 : 8;
  const circleSize = isXs ? 20 : 26;

  return (
    <div className={props.classes.pickerContainer}>
      <CirclePicker
        colors={colors}
        width={containerWidth}
        circleSize={circleSize}
        circleSpacing={circleSpacing}
        onChangeComplete={handleColorChange}
      />
    </div>
  );
};

ColorPicker.propTypes = {
  isXs: PropTypes.bool.isRequired,
  containerWidth: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  handleColorChange: PropTypes.func.isRequired
};

export default withStyles(styles)(ColorPicker);
