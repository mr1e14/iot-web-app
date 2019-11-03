import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MaterialIcon from "./MaterialIcon";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

class DeleteLightButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      notificationOpen: false,
      confirmed: false,
      apiResponsePending: false
    };
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleNotificationClose = () => {
    this.setState({ notificationOpen: false });
  };

  handleConfirmation = () => {
    this.setState({ apiResponsePending: true }, () =>
      axios
        .post("/api/lights/deleteLight", {
          id: this.props.lightId
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ confirmed: true });
          } else {
            throw new Error(`Unexpected status response: ${res.status}`);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ notificationOpen: true, apiResponsePending: false });
        })
    );
  };

  render() {
    const {
      dialogOpen,
      confirmed,
      notificationOpen,
      apiResponsePending
    } = this.state;

    return confirmed ? (
      <Redirect to="/lights" />
    ) : (
      <React.Fragment>
        <Tooltip title="Delete light">
          <IconButton color="secondary" onClick={this.handleDialogOpen}>
            <MaterialIcon iconName="delete_outline" />
          </IconButton>
        </Tooltip>
        <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>Are you sure you want to delete the light?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                "You won't be able to use it here, but you can add it back later."
              }
            </DialogContentText>
            {apiResponsePending ? <LoadingSpinner /> : null}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.handleConfirmation}
              color="primary"
              disabled={apiResponsePending}
            >
              Delete light
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleDialogClose}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Notification
          variant="error"
          message="Connection error: failed to delete light"
          open={notificationOpen}
          handleClose={this.handleNotificationClose}
        />
      </React.Fragment>
    );
  }
}

export default DeleteLightButton;
