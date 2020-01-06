import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const DeviceButton = props => {
  const { className, text, iconSrc, iconAlt, linkTo } = props;

  return (
    <Button
      component={Link}
      to={linkTo}
      variant="contained"
      fullWidth={true}
      className={className}
    >
      <Typography color="textPrimary">{text}</Typography>
      <img src={iconSrc} alt={iconAlt} style={{ padding: "0.25rem 0.5rem" }} />
    </Button>
  );
};

DeviceButton.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

export default DeviceButton;
