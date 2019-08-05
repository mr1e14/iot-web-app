import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";
import { CirclePicker } from "react-color";
import LoadingSpinner from "./LoadingSpinner";

// TODO move to MongoDB
const colors = [
  "#ff0000",
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
  "#9934eb",
  "#8334eb",
  "#6b34eb",
  "#5634eb",
  "#4034eb",
  "#3456eb",
  "#346eeb",
  "#3486eb",
  "#349feb",
  "#34b7eb",
  "#34c9eb",
  "#34e8eb",
  "#34ebd9",
  "#34ebc3",
  "#34eba8",
  "#34eb8c",
  "#34eb80",
  "#34eb5f",
  "#37eb34",
  "#4ceb34",
  "#6eeb34",
  "#a2eb34",
  "#cdeb34",
  "#ebe834",
  "#ebd934",
  "#ebb734",
  "#eba534",
  "#eb9634",
  "#eb8334",
  "#eb6534"
];

class LightController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      on: false
    };
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`/api/getLightDataById/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightData }));
  }

  render() {
    const { classes } = this.props;
    if (!this.state.connected) {
      return <LoadingSpinner />;
    } else {
      return (
        <Grid container justify="center" alignItems="center">
          <CirclePicker colors={colors} width="100%" />
        </Grid>
      );
    }
  }
}

export default LightController;
