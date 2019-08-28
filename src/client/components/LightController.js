import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LightBrightnessSlider from "./LightBrigtnessSlider";
import IconButton from "@material-ui/core/IconButton";
import MaterialIcon from "./MaterialIcon";
import LoadingSpinner from "./LoadingSpinner";
import ColorPicker from "./ColorPicker";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class LightController extends React.Component {
  constructor(props) {
    super(props);
    // initialize if cached
    this.state = { ...props.lightData };
  }

  componentDidMount() {
    const { id } = this.props;
    // always update after render
    fetch(`/api/lights/getLightDataById/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightData }));

    fetch("/api/lights/getSupportedColors")
      .then(res => res.json())
      .then(res => this.setState({ colors: res.supportedColors }));
  }

  onNameChange(event) {
    // TODO validate
    this.setState({ name: event.target.value });
    // TODO API request to save value
  }

  handleToggleClick = event => {
    this.setState({ on: !this.state.on });
  };

  handleColorChange = (color, event) => {
    this.setState({ color: color.hex });
  };

  render() {
    const { classes, isXs } = this.props;
    const { on, connected, name, color, colors } = this.state;
    const containerWidth = isXs ? "260px" : "520px";
    if (!connected || !colors) {
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
                <MaterialIcon
                  iconName={
                    this.state.connected ? "power_settings_new" : "power_off"
                  }
                />
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
            <div style={{ width: containerWidth }}>
              <Grid item xs={12} className={classes.child}>
                <TextField
                  defaultValue={name}
                  onChange={e => this.onNameChange(e)}
                />
              </Grid>
              <Grid item xs={12} className={classes.child}>
                <ColorPicker
                  colors={colors}
                  containerWidth={containerWidth}
                  isXs={isXs}
                  handleColorChange={this.handleColorChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.sliderBackground}
                style={{
                  background: `linear-gradient(45deg, ${color} 35%, rgb(242,242,242) 90%)`
                }}
              >
                <LightBrightnessSlider on={on} connected={connected} />
              </Grid>
            </div>
          </Grid>
        </React.Fragment>
      );
    }
  }
}

export default LightController;
