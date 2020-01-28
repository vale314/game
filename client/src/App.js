import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Index from "./pages/index";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact render={props => <Index {...props} />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
