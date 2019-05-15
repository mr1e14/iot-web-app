import React, { Component } from "react";
import ThemeWrapper from "./components/ThemeWrapper";
import { oneLight, twoLights, fourLights } from "./sample_data/lights";

export default class App extends Component {
  state = { weatherData: null, lightsData: fourLights };

  componentDidMount() {
    fetch("/api/getWeatherData")
      .then(res => res.json())
      .then(res => this.setState({ weatherData: res.weatherData }));
  }

  render() {
    return <ThemeWrapper {...this.state} />;
  }
}
