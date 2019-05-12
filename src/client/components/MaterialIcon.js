import React from "react";
import Icon from "@material-ui/core/Icon";
import matches from "./mediaQuery";

const MaterialIcon = props => {
  const iconSize = matches("md") ? "md-46" : "md-28";
  return <Icon classes={{ root: iconSize }}>{props.iconName}</Icon>;
};

export default MaterialIcon;
