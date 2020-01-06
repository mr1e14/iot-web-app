import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MaterialIcon from "./MaterialIcon";
import { Link } from "react-router-dom";
import LightEffectsSettings from "./LightEffectsSettings";
import matches from "./mediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  panelContainer: {
    textAlign: "left",
    width: "260px",
    [theme.breakpoints.up("sm")]: {
      width: "520px"
    },
    [theme.breakpoints.up("md")]: {
      width: "825px"
    }
  },
  settingContainer: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(3),
      width: "80%"
    }
  },
  effectLabel: {
    width: "20%",
    textTransform: "capitalize"
  }
}));

const LightSettingsPanel = props => {
  const { classes, id, config } = props;
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        className={classes.child}
      >
        <Grid item>
          <Tooltip title="Back">
            <IconButton component={Link} to={`/light/${id}`} color="secondary">
              <MaterialIcon iconName="arrow_back" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <LightEffectsSettings
        config={config}
        isMd={matches("md")}
        id={id}
        classes={classes}
        customClasses={useStyles()}
      />
    </React.Fragment>
  );
};

LightSettingsPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  config: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LightSettingsPanel;
