import React from "react";
import TextField from "@material-ui/core/TextField";
import { validateRoomName } from "./deviceFunctions";
import { MAX_ROOM_NAME_LENGTH } from "../config";

class RoomNameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name, isValid: validateRoomName(props.name) };
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value,
      isValid: validateRoomName(event.target.value)
    });
    // TODO API request to save value
  }
  render() {
    const { name, isValid } = this.state;
    return (
      <TextField
        defaultValue={name}
        onChange={e => this.onNameChange(e)}
        error={!isValid}
        helperText={
          !isValid
            ? `Must be between 1 - ${MAX_ROOM_NAME_LENGTH} characters`
            : ""
        }
        inputProps={{ className: this.props.classes.textCenter }}
      />
    );
  }
}

export default RoomNameField;
