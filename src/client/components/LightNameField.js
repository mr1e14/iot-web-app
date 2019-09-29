import React from "react";
import TextField from "@material-ui/core/TextField";
import { validateLightName } from "./deviceFunctions";
import { MAX_LIGHT_NAME_LENGTH } from "../config";

class LightNameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValid: validateLightName(props.name) };
  }

  onNameChange(event) {
    const newName = event.target.value;
    this.setState(
      {
        isValid: validateLightName(newName)
      },
      () => {
        if (this.state.isValid) {
          this.props.handleChange(newName);
        }
      }
    );
  }
  render() {
    const { isValid } = this.state;
    const { name } = this.props;
    return (
      <TextField
        defaultValue={name}
        onChange={e => this.onNameChange(e)}
        error={!isValid}
        helperText={
          !isValid
            ? `Must be between 1 - ${MAX_LIGHT_NAME_LENGTH} characters`
            : ""
        }
        inputProps={{ className: this.props.classes.textCenter }}
      />
    );
  }
}

LightNameField.defaultProps = {
  name: ""
};

export default LightNameField;
