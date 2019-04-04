import React from "react";
import "../css/app.css";
import "../css/material-ui-icons.css";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Layout } from "./";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  child: {
    padding: theme.spacing.unit * 2,
    textAlign: "center"
  }
});

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#11cb5f" }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true }
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
