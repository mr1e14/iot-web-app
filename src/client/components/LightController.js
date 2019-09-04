import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MaterialIcon from "./MaterialIcon";
import LoadingSpinner from "./LoadingSpinner";
import ColorPicker from "./ColorPicker";
import RoomNameField from "./RoomNameField";
import { Link } from "react-router-dom";

class LightController extends React.Component {
  constructor(props) {
    super(props);
    // initialize if cached
    this.state = {
      name: "",
      color: "#1a1a1a",
      brightness: 0
    };
    this.handleBrightnessChange = this.handleBrightnessChange.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleEffectChange = this.handleEffectChange.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    // always update after render
    fetch(`/api/lights/getLightDataById/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightData }));
  }

  handleToggleClick = event => {
    this.setState({ on: !this.state.on }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  handleColorChange = (color, event) => {
    this.setState({ color: color.hex }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  handleBrightnessChange = (event, value) => {
    this.setState({ brightness: value }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  handleNameChange = newName => {
    this.setState({ name: newName }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  handleEffectChange = sourceEffect => {
    // clear if same as current
    const newEffect = this.state.effect !== sourceEffect ? sourceEffect : null;
    this.setState({ effect: newEffect }, () =>
      axios.post("/api/lights/updateLightData", {
        id: this.props.id,
        ...this.state
      })
    );
  };

  render() {
    const { classes, isXs, supportedColors, supportedEffects } = this.props;
    const { on, connected, name, color, brightness, effect } = this.state;
    const containerWidth = isXs ? "260px" : "520px";
    if (!connected || !supportedColors) {
      return <LoadingSpinner />;
    } else {
      return (
        <React.Fragment>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="space-between"
            className={classes.child}
          >
            <Grid item>
              <IconButton component={Link} to="/lights" color="secondary">
                <MaterialIcon iconName="arrow_back" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                disabled={!connected}
                onClick={this.handleToggleClick}
              >
                <MaterialIcon iconName="power_settings_new" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.root}
          >
            <div style={{ width: containerWidth, opacity: on ? 1 : 0.2 }}>
              <Grid item xs={12} className={classes.child}>
                <RoomNameField
                  name={name}
                  classes={classes}
                  handleChange={this.handleNameChange}
                />
              </Grid>
              <Grid item xs={12} className={classes.child}>
                <ColorPicker
                  colors={supportedColors}
                  containerWidth={containerWidth}
                  isXs={isXs}
                  handleColorChange={this.handleColorChange}
                />
              </Grid>
              <Grid item xs={12} className={classes.child}>
                <div
                  className={classes.sliderBackground}
                  style={{
                    background: `linear-gradient(45deg, ${color} 35%, rgb(242,242,242) 90%)`
                  }}
                >
                  <LightBrightnessSlider
                    on={on}
                    connected={connected}
                    brightness={brightness}
                    handleChange={this.handleBrightnessChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} className={classes.child}>
                {supportedEffects.map((supportedEffect, key) => (
                  <Button
                    variant="outlined"
                    color="secondary"
                    key={key}
                    className={
                      supportedEffect === effect ? classes.selectedEffect : null
                    }
                    onClick={() => this.handleEffectChange(supportedEffect)}
                  >
                    {supportedEffect}
                  </Button>
                ))}
              </Grid>
            </div>
          </Grid>
        </React.Fragment>
      );
    }
  }
}

export default LightController;
