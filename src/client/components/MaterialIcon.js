import React from "react";
import Icon from "@material-ui/core/Icon";
import matches from "./mediaQuery";

const MaterialIcon = props => {
  const iconSize = matches("sm") ? "md-64" : "md-48";
  return <Icon classes={{ root: iconSize }}>{props.iconName}</Icon>;
};

export default MaterialIcon;
