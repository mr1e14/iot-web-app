import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import matches from "./mediaQuery";

const MaterialIcon = props => {
  const iconSize = matches("md") ? "md-40" : "md-28";
  return <Icon classes={{ root: iconSize }}>{props.iconName}</Icon>;
};

MaterialIcon.propTypes = {
  iconName: PropTypes.string.isRequired
};

export default MaterialIcon;
