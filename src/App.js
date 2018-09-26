import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NavigationBar } from './components/';

class App extends Component {
  render() {
    return (
      <NavigationBar />
    );
  }
}

export default withRouter(App);
