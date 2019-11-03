import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import Lights from "./pages/Lights";
import LightView from "./pages/LightView";
import LightSettings from "./pages/LightSettings";
import Cookie from "js-cookie";

class PageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousDepth: this.getPathDepth(this.props.location),
      supportedColors: null,
      supportedEffects: null,
      effectsConfiguration: null,
      isMobileDevice: Cookie.get("isMobile") === "true"
    };
  }

  componentDidMount() {
    fetch("/api/getWeatherData")
      .then(res => res.json())
      .then(res => this.setState({ weatherData: res.weatherData }));

    fetch("/api/lights/getSupportedColors")
      .then(res => res.json())
      .then(res => this.setState({ supportedColors: res.supportedColors }));

    fetch("/api/lights/getSupportedEffects")
      .then(res => res.json())
      .then(res => this.setState({ supportedEffects: res.supportedEffects }));

    fetch("/api/lights/getEffectsConfiguration")
      .then(res => res.json())
      .then(res =>
        this.setState({ effectsConfiguration: res.effectsConfiguration })
      );

    if (!Cookie.get("isMobile")) {
      fetch("/api/detect-mobile")
        .then(res => res.json())
        .then(res =>
          this.setState({ isMobileDevice: res.isMobileDevice }, () =>
            Cookie.set("isMobile", res.isMobileDevice)
          )
        );
    }
  }

  componentWillReceiveProps() {
    this.setState({ previousDepth: this.getPathDepth(this.props.location) });
  }

  getPathDepth(location) {
    let path = location.pathname.split("/");
    return path.filter(page => page !== "").length;
  }

  render() {
    const { location, classes } = this.props;
    const {
      weatherData,
      supportedColors,
      supportedEffects,
      effectsConfiguration,
      isMobileDevice
    } = this.state;
    const transitionProperties = isMobileDevice
      ? { timeout: { enter: 700, exit: 350 }, class: "slide" }
      : { timeout: { enter: 300, exit: 150 }, class: "fade" };

    return (
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={transitionProperties.timeout}
          classNames={transitionProperties.class}
          mountOnEnter={false}
          unmountOnExit={true}
        >
          <div
            className={
              this.getPathDepth(location) - this.state.previousDepth >= 0
                ? "left"
                : "right"
            }
          >
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={() => (
                  <Home classes={classes} weatherData={weatherData} />
                )}
              />
              <Route
                path="/lights"
                render={() => (
                  <Lights classes={classes} weatherData={weatherData} />
                )}
              />
              <Route
                path="/light/:id/settings"
                render={props => (
                  <LightSettings
                    classes={classes}
                    match={props.match}
                    config={effectsConfiguration}
                  />
                )}
              />
              <Route
                path="/light/:id"
                render={props => (
                  <LightView
                    classes={classes}
                    match={props.match}
                    supportedColors={supportedColors}
                    supportedEffects={supportedEffects}
                  />
                )}
              />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
export default withRouter(PageSwitch);
