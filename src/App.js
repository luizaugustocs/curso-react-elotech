import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home  from './Home';
import Configuracoes from './Configuracoes'
import Header from './components/Header';
import NotFound from './NotFound';
import { Switch, Route, withRouter } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logado: false
    }
  }

  onLogin = () => {
      this.setState({logado: true});
  }

  onLogout = () => {
    this.setState({logado: false});
    this.props.history.push('/')
}
  render() {

    const {logado} = this.state;
    return (
          <div>
            <Header logado={logado} onLogin={this.onLogin} onLogout={this.onLogout}/>
            <Switch>
                <Route path="/" exact component={Home}/> 
                <Route path="/configuracao" exact component={Configuracoes}/> 
                <Route component={NotFound} />
              </Switch>
          </div>
    );
  }
}


export default withRouter(App);
