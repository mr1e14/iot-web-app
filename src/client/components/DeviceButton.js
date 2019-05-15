import React from "react";
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
      <Typography>{text}</Typography>
      <img src={iconSrc} alt={iconAlt} style={{ padding: "0.25rem 0.5rem" }} />
    </Button>
  );
};

export default DeviceButton;
