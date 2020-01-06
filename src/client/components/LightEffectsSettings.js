import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "./LoadingSpinner";
import LightEffectsSettingsOptions from "./LightEffectSettingsOptions";
import Typography from "@material-ui/core/Typography";
import Notification from "./Notification";
import { LIGHT_UPDATE_REQUEST_TIMEOUT } from "../config";

class LightEffectsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notificationOpen: false };
  }

  componentDidMount() {
    fetch(`/api/lights/getLightSettingsById/${this.props.id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightSettings }));
  }

  handleChange = (optionName, value) => {
    this.setState({ [optionName]: value }, () =>
      axios
        .post(
          "/api/lights/updateLightSettings",
          {
            id: this.props.id,
            ...this.state
          },
          { timeout: LIGHT_UPDATE_REQUEST_TIMEOUT }
        )
        .catch(err => {
          console.error(err);
          this.setState({ notificationOpen: true });
        })
    );
  };

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
  };

  render() {
    const { classes, customClasses, config } = this.props;

    if (!config || !this.state._id) {
      return <LoadingSpinner />;
    } else {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={2}
          className={classes.root}
        >
          <Notification
            variant="error"
            message="Could not update settings"
            open={this.state.notificationOpen}
            handleClose={this.handleNotificationClose}
          />
          <Grid container className={customClasses.panelContainer}>
            {config.map((effect, key) => (
              <React.Fragment key={key}>
                <Grid item xs={12} md={3} className={customClasses.effectLabel}>
                  <Typography
                    className={customClasses.effectLabel}
                    color="textPrimary"
                    variant="h6"
                  >
                    {effect.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <LightEffectsSettingsOptions
                    classes={customClasses}
                    configOptions={effect.configOptions}
                    effectName={effect.name}
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      );
    }
  }
}

LightEffectsSettings.propTypes = {
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  customClasses: PropTypes.object.isRequired
};

export default LightEffectsSettings;
