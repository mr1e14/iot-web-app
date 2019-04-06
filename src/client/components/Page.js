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
    type: "dark",
    primary: { main: "#11cb5f" },
    secondary: { main: "#52cafe" }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  "@global": {
    span: {
      fontSize: 18,
      [theme.breakpoints.up("sm")]: {
        fontSize: 22
      }
    }
  },
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  childGridLeft: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
  paper1: {
    backgroundColor: "#64dd17"
  },
  paper2: {
    backgroundColor: "#d500f9"
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
