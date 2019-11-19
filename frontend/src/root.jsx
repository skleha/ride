import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppContainer from "./App_Container";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </Provider>
);

export default Root;
