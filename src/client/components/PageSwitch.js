import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Lights from "./pages/Lights";

const Page = props => (
  <Switch>
    <Route exact path="/" render={() => <Home {...props} />} />
    <Route path="/lights" render={() => <Lights {...props} />} />
  </Switch>
);

const PageSwitch = props => <Page {...props} />;

export default PageSwitch;
