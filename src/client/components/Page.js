import React from "react";
import "../css/app.css";
import "../css/material-ui-icons.css";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Layout } from "./";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#11cb5f" },
    secondary: { main: "#52cafe" },
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
    ].join(","),
    subtitle1: {
      fontStyle: "italic"
    }
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
    textAlign: "center"
  },
  childGridLeft: {
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 2
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 16,
      paddingRight: theme.spacing.unit * 4
    }
  },
  childGridRight: {
    paddingBottom: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 8
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing.unit * 4,
      paddingRight: theme.spacing.unit * 16
    }
  },
  childGridCenter: {
    paddingBottom: theme.spacing.unit * 4
  },
  button1: {
    backgroundColor: "#11cb5f",
    "&:hover": {
      backgroundColor: "#bdbdbd"
    }
  },
  button2: {
    backgroundColor: "#9c27b0",
    "&:hover": {
      backgroundColor: "#bdbdbd"
    }
  },
  button3: {
    backgroundColor: "#2196f3",
    "&:hover": {
      backgroundColor: "#bdbdbd"
    }
  },
  button4: {
    backgroundColor: "#ff5722",
    "&:hover": {
      backgroundColor: "#bdbdbd"
    }
  }
});

const Page = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Layout {...props} />
      </MuiThemeProvider>
    </React.Fragment>
  );
};

Page.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Page);
