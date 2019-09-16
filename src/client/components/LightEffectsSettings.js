import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "./LoadingSpinner";
import LightEffectsSettingsOptions from "./LightEffectSettingsOptions";
import Typography from "@material-ui/core/Typography";

class LightEffectsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(`/api/lights/getLightSettingsById/${this.props.id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightSettings }));
  }

  handleChange = (optionName, value) => {
    this.setState({ [optionName]: value }, () =>
      axios.post("/api/lights/updateLightSettings", {
        id: this.props.id,
        ...this.state
      })
    );
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

export default LightEffectsSettings;
