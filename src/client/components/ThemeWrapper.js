import React from "react";
import "../css/app.css";
import "../css/material-ui-icons.css";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import PageSwitch from "./PageSwitch";
import matches from "./mediaQuery";

const deviceButtonHoverColor = "#bdbdbd";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1a1a1a" },
    secondary: { main: "#52cafe" },
    text: {
      primary: "#ffffff",
      secondary: "#52cafe"
    }
  },
  typography: {
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
    },
    ".MuiDialogContentText-root": {
      color: "#737373"
    },
    ".MuiDialogTitle-root": {
      color: "#1a1a1a"
    }
  },
  root: {
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 8)
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(0, 16)
    }
  },
  child: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(3)
    }
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
  },
  lightsPanel: {
    position: "relative",
    overflow: "hidden"
  },
  lightRow: {
    boxShadow: "0 3px 5px 2px rgba(51,51,51, .3)",
    borderRadius: 6,
    padding: "8px 12px 0",
    marginBottom: theme.spacing(2)
  },
  sliderBackground: {
    boxShadow: "0 4px 4px 4px rgba(51,51,51, .3)",
    borderRadius: 16,
    padding: "0 12px"
  },
  textCenter: {
    textAlign: "center"
  },
  selectedEffect: {
    background: "rgba(82, 202, 254, 0.4)"
  }
});

const ThemeWrapper = props => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <PageSwitch isMobileDevice={!matches("lg")} {...props} />
    </MuiThemeProvider>
  </React.Fragment>
);

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThemeWrapper);
