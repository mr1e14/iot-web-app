import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import Lights from "./pages/Lights";

const Page = props => (
  <Route
    render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
          <Switch location={location}>
            <Route exact path="/" render={() => <Home {...props} />} />
            <Route path="/lights" render={() => <Lights {...props} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}
  />
);

const PageSwitch = props => <Page {...props} />;

export default PageSwitch;
