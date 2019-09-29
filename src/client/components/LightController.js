import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import MaterialIcon from "./MaterialIcon";
import LoadingSpinner from "./LoadingSpinner";
import ColorPicker from "./ColorPicker";
import LightNameField from "./LightNameField";
import DeleteLightButton from "./DeleteLightButton";
import { Link } from "react-router-dom";
import Notification from "./Notification";

class LightController extends React.Component {
  constructor(props) {
    super(props);
    // initialize if cached
    this.state = {
      refreshInProgress: false,
      notificationOpen: false
    };
    this.handleBrightnessChange = this.handleBrightnessChange.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleEffectChange = this.handleEffectChange.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData = () => {
    this.setState({ refreshInProgress: true });
    fetch(`/api/lights/getLightDataById/${this.props.id}`)
      .then(res => res.json())
      .then(res =>
        this.setState({ ...res.lightData, refreshInProgress: false })
      );
  };

  updateState = (key, value) => {
    const newDesiredState = Object.assign({}, this.state, { [key]: value });
    this.setState({ refreshInProgress: true }, () =>
      axios
        .post("/api/lights/updateLightData", {
          id: this.props.id,
          ...newDesiredState
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ ...newDesiredState });
          } else {
            throw new Error(`Unexpected status response: ${res.status}`);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ notificationOpen: true });
        })
        .finally(() => this.setState({ refreshInProgress: false }))
    );
  };

  handleToggleClick = event => {
    this.updateState("on", !this.state.on);
  };

  handleColorChange = (color, event) => {
    this.updateState("color", color.hex);
  };

  handleBrightnessChange = (event, value) => {
    this.updateState("brightness", value);
  };

  handleNameChange = newName => {
    this.updateState("name", newName);
  };

  handleEffectChange = sourceEffect => {
    // clear if same as current
    const newEffect = this.state.effect !== sourceEffect ? sourceEffect : null;
    this.updateState("effect", newEffect);
  };

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
  };

  render() {
    const { classes, isXs, supportedColors, supportedEffects } = this.props;
    const {
      on,
      connected,
      name,
      color,
      brightness,
      effect,
      refreshInProgress,
      _id,
      notificationOpen
    } = this.state;
    const containerWidth = isXs ? "260px" : "520px";
    const containerOpacity = refreshInProgress ? 0.4 : on ? 1 : 0.2;
    if (!connected || !supportedColors) {
      return <LoadingSpinner />;
    } else {
      return (
        <React.Fragment>
          {refreshInProgress ? <LoadingSpinner /> : null}
          <Notification
            variant="error"
            message="Failed to perform action"
            open={notificationOpen}
            handleClose={this.handleNotificationClose}
          />
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justify="space-between"
            className={classes.child}
          >
            <Grid item>
              <Tooltip title="Back">
                <IconButton component={Link} to="/lights" color="secondary">
                  <MaterialIcon iconName="arrow_back" />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh">
                <IconButton
                  disabled={refreshInProgress}
                  color="secondary"
                  onClick={this.refreshData}
                >
                  <MaterialIcon iconName="refresh" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.root}
          >
            <div style={{ width: containerWidth }}>
              <div style={{ opacity: containerOpacity }}>
                <Grid item xs={12} className={classes.child}>
                  <LightNameField
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
                        supportedEffect === effect
                          ? classes.selectedEffect
                          : null
                      }
                      onClick={() => this.handleEffectChange(supportedEffect)}
                    >
                      {supportedEffect}
                    </Button>
                  ))}
                </Grid>
              </div>
              <Grid
                container
                justify="space-between"
                item
                xs={12}
                className={classes.child}
              >
                <Tooltip title="Schedule">
                  <IconButton color="secondary" onClick={null}>
                    <MaterialIcon iconName="access_time" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Turn ${on ? "off" : "on"}`}>
                  <IconButton
                    color="secondary"
                    onClick={this.handleToggleClick}
                  >
                    <MaterialIcon iconName="power_settings_new" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton
                    component={Link}
                    to={`/light/${_id}/settings`}
                    color="secondary"
                    onClick={null}
                  >
                    <MaterialIcon iconName="settings" />
                  </IconButton>
                </Tooltip>
                <DeleteLightButton lightId={_id} />
              </Grid>
            </div>
          </Grid>
        </React.Fragment>
      );
    }
  }
}

export default LightController;
