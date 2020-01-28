import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "./assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";

import Index from "./pages/index";
import Login from "./pages/login";

const hist = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            <Route path="/" exact render={props => <Index {...props} />} />
            <Route path="/login" exact render={props => <Login />} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
