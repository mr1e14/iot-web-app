import React from "react";
import "../css/app.css";
import "../css/material-ui-icons.css";
import Icon from "@material-ui/core/Icon";
import matches from "../mediaQuery";

const MaterialIcon = props => {
  const iconSize = matches("xs") ? "md-48" : "md-64";
  return <Icon classes={{ root: iconSize }}>{props.iconName}</Icon>;
};

export default MaterialIcon;
