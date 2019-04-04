import React, { Component } from "react";
import { Page } from "./components";

export default class App extends Component {
  state = { weatherData: null };

  componentDidMount() {
    fetch("/api/getWeatherData")
      .then(res => res.json())
      .then(res => this.setState({ weatherData: res.weatherData }));
  }

  render() {
    const { weatherData } = this.state;
    return <Page weatherData={weatherData} />;
  }
}
