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

// TODO move to MongoDB
const colors = [
  "#ff0000",
  "#ff0032",
  "#eb3434",
  "#eb3449",
  "#eb3468",
  "#eb3483",
  "#eb348c",
  "#eb34a2",
  "#eb34b4",
  "#eb34d0",
  "#e534eb",
  "#d334eb",
  "#c634eb",
  "#b434eb",
  "#ae34eb",
  "#a234eb",
  "#9934eb",
  "#8334eb",
  "#6b34eb",
  "#5c34eb",
  "#5634eb",
  "#4034eb",
  "#3437eb",
  "#3456eb",
  "#345ceb",
  "#346eeb",
  "#3474eb",
  "#3486eb",
  "#349feb",
  "#34b1eb",
  "#34b7eb",
  "#34c9eb",
  "#34d3eb",
  "#34e8eb",
  "#34ebd9",
  "#34ebc3",
  "#34ebb1",
  "#34eba8",
  "#34eb8c",
  "#34eb80",
  "#34eb5f",
  "#37eb34",
  "#4ceb34",
  "#6eeb34",
  "#a2eb34",
  "#b7eb34",
  "#c0eb34",
  "#cdeb34",
  "#dfeb34",
  "#ebe834",
  "#ebd934",
  "#ebd334",
  "#ebb734",
  "#eba534",
  "#eb9634",
  "#eb8334",
  "#eb7734",
  "#eb6534",
  "#eb5f34",
  "#eb5334"
];

const ColorPicker = props => {
  const isXs = !matches("sm");
  const pickerWidth = isXs ? "260px" : "520px";
  const circleSpacing = isXs ? 6 : 8;
  const circleSize = isXs ? 20 : 26;

  return (
    <div className={props.classes.pickerContainer}>
      <CirclePicker
        colors={colors}
        width={pickerWidth}
        circleSize={circleSize}
        circleSpacing={circleSpacing}
      />
    </div>
  );
};

export default withStyles(styles)(ColorPicker);
