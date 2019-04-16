import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const DeviceButton = props => {
  const { className, text, iconSrc, iconAlt } = props;

  return (
    <Button variant="contained" fullWidth={true} className={className}>
      <Typography>{text}</Typography>
      <img src={iconSrc} alt={iconAlt} style={{ padding: "0.25rem 0.5rem" }} />
    </Button>
  );
};

export default DeviceButton;
