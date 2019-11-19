import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import {
  signup,
  errorsGone
} from "../../actions/session_actions";
import SignupForm from "./signupForm";


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session
  };
};


const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    clearErrors: ()=>dispatch(errorsGone())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
