import React from "react";
import "../css/app.css";
import "../css/material-ui-icons.css";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Layout from "./Layout";

const deviceButtonHoverColor = "#bdbdbd";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#52cafe" },
    secondary: { main: "#11cb5f" },
    text: {
      primary: "#ffffff",
      secondary: "#52cafe"
    }
  },
  typography: {
    useNextVariants: true,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\""
    ].join(",")
  }
});

const styles = theme => ({
  "@global": {
    html: {
      fontSize: 16,
      [theme.breakpoints.up("sm")]: {
        fontSize: 18
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 20
      }
    }
  },
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 16,
      paddingRight: theme.spacing.unit * 16
    }
  },
  child: {
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing.unit * 4
    }
  },
  childGridLeft: {
    paddingBottom: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit,
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.up("lg")]: {
      paddingRight: theme.spacing.unit * 4
    }
  },
  childGridRight: {
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 2
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 4
    }
  },
  childGridCenter: {
    paddingBottom: theme.spacing.unit * 4
  },
  deviceButton1: {
    backgroundColor: "#11cb5f",
    "&:hover": {
      backgroundColor: deviceButtonHoverColor
    }
  },
  deviceButton2: {
    backgroundColor: "#9c27b0",
    "&:hover": {
      backgroundColor: deviceButtonHoverColor
    }
  },
  deviceButton3: {
    backgroundColor: "#2196f3",
    "&:hover": {
      backgroundColor: deviceButtonHoverColor
    }
  },
  deviceButton4: {
    backgroundColor: "#ff5722",
    "&:hover": {
      backgroundColor: deviceButtonHoverColor
    }
  },
  buttonLabel: {
    "text-transform": "none"
  }
});

const ThemeWrapper = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Layout {...props} />
      </MuiThemeProvider>
    </React.Fragment>
  );
};

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThemeWrapper);
