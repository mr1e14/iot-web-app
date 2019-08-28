import React from "react";
import TextField from "@material-ui/core/TextField";
import { validateRoomName } from "./deviceFunctions";
import { MAX_ROOM_NAME_LENGTH } from "../config";

class RoomNameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
    // TODO API request to save value
  }
  render() {
    return (
      <TextField
        defaultValue={this.state.name}
        onChange={e => this.onNameChange(e)}
        error={!validateRoomName(this.state.name)}
        helperText={
          !validateRoomName(this.state.name)
            ? `Must be between 1 - ${MAX_ROOM_NAME_LENGTH} characters`
            : ""
        }
        inputProps={{ className: this.props.classes.textCenter }}
      />
    );
  }
}

export default RoomNameField;
