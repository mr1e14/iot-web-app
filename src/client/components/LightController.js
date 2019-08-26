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

class LightController extends React.Component {
  constructor(props) {
    super(props);
    // initialize if cached
    this.state = { ...props.lightData };
  }

  componentDidMount() {
    const { id } = this.props;
    // always update after render
    fetch(`/api/getLightDataById/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ ...res.lightData }));
  }

  onNameChange(event) {
    // TODO validate
    this.setState({ name: event.target.value });
    // TODO API request to save value
  }

  render() {
    const { classes } = this.props;
    const { connected, name } = this.state;
    if (!connected) {
      return <LoadingSpinner />;
    } else {
      return (
        <Grid container justify="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              defaultValue={name}
              onChange={e => this.onNameChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <ColorPicker />
          </Grid>
        </Grid>
      );
    }
  }
}

export default LightController;
