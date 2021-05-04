import React from "react";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import configureStore from "./configureStore";
import {history } from './history/history'

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}
export default Root;
