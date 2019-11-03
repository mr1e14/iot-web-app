import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";
import { Link } from "react-router-dom";

const defaultBackgroundColor = "#1a1a1a";
const labelColor = "#ffffff";

class LightOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brightness: null };
  }

  handleToggleClick = event => {
    this.setState({ on: !this.state.on }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  handleBrightnessChange = value => {
    this.setState({ brightness: value }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  componentDidMount() {
    fetch(`/api/lights/getLightDataById/${this.props.id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightData }));
  }

  render() {
    const { on, connected, brightness, color, name, _id } = this.state;
    const { classes, id } = this.props;
    return (
      <Grid
        style={{
          background: `linear-gradient(45deg, ${color ||
            defaultBackgroundColor} 35%, rgb(242,242,242) 90%)`,
          opacity: on ? 1 : 0.2,
          cursor: connected ? "pointer" : "no-drop"
        }}
        container
        alignItems="center"
        className={classes.lightRow}
      >
        <Grid item xs={10}>
          <Button
            component={Link}
            to={`/light/${id}`}
            variant="contained"
            color="primary"
            fullWidth
            disabled={!connected}
            style={{
              color: labelColor
            }}
          >
            <Typography>{name}</Typography>
          </Button>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color="primary"
            disabled={!connected}
            onClick={this.handleToggleClick}
          >
            <MaterialIcon
              iconName={
                this.state.connected ? "power_settings_new" : "power_off"
              }
            />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          {brightness !== null ? (
            <LightBrightnessSlider
              on={on}
              connected={connected}
              brightness={brightness}
              handleChange={this.handleBrightnessChange}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

export default LightOverview;
