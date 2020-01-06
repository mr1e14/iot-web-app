import React from "react";
import PropTypes from "prop-types";
import { amber, green, blue } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error: "error",
  info: "info"
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
    marginRight: theme.spacing(1)
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  info: {
    backgroundColor: blue[500],
    marginRight: theme.spacing(1)
  },
  warning: {
    backgroundColor: amber[700],
    marginRight: theme.spacing(1)
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px"
  }
}));

const Notification = props => {
  const classes = useStyles();
  const { message, handleClose, variant, open } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon}>{variantIcon[variant]}</Icon>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Icon className={classes.icon}>{"close"}</Icon>
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  open: PropTypes.bool
};

export default Notification;
