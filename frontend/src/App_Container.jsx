import React from "react";
import { Route, Redirect, Switch, Link, HashRouter } from "react-router-dom";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "./App";

const mapStateToProps = state => {
  return {
    // modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
