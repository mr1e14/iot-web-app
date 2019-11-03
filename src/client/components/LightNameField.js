import React from "react";
import TextField from "@material-ui/core/TextField";
import { validateLightName } from "./deviceFunctions";
import { MAX_LIGHT_NAME_LENGTH, INPUT_DEBOUNCE_TIME } from "../config";
import debounce from "awesome-debounce-promise";

class LightNameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: validateLightName(props.name)
    };
    this.saveName = debounce(
      name => this.props.handleChange(name),
      INPUT_DEBOUNCE_TIME
    );
  }

  onNameChange = event => {
    const newName = event.target.value;
    const isValid = validateLightName(newName);
    this.setState(
      {
        isValid
      },
      async () => {
        if (isValid) {
          await this.saveName(newName);
        }
      }
    );
  };
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
