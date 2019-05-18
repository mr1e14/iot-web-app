import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import Lights from "./pages/Lights";

class PageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousDepth: this.getPathDepth(this.props.location),
      weatherData: null,
      lightsData: null
    };
  }

  componentDidMount() {
    fetch("/api/getWeatherData")
      .then(res => res.json())
      .then(res => this.setState({ weatherData: res.weatherData }));

    fetch("/api/getLightsData")
      .then(res => res.json())
      .then(res => this.setState({ lightsData: res.lightsData }));
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
    const { weatherData, lightsData } = this.state;
    return (
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={{ enter: 700, exit: 350 }}
          classNames="pageSlider"
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
                  <Lights
                    classes={classes}
                    weatherData={weatherData}
                    lightsData={lightsData}
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
