import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import { NavigationBar } from './components/';

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
