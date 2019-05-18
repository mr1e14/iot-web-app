import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import Lights from "./pages/Lights";

class PageSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousDepth: this.getPathDepth(this.props.location)
    };
  }

  componentWillReceiveProps() {
    this.setState({ previousDepth: this.getPathDepth(this.props.location) });
  }

  getPathDepth(location) {
    let path = location.pathname.split("/");
    return path.filter(page => page !== "").length;
  }

  render() {
    const { location } = this.props;
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
              <Route exact path="/" render={() => <Home {...this.props} />} />
              <Route path="/lights" render={() => <Lights {...this.props} />} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
export default withRouter(PageSwitch);
