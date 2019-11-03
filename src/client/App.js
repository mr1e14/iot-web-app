import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ThemeWrapper from "./components/ThemeWrapper";

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

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <ThemeWrapper />
    </MuiThemeProvider>
  </React.Fragment>
);

export default App;
