import { connect } from "react-redux";
// import {closeModal} from "../../actions/modal_actions"

import {
  login,
  errorsGone
} from "../../actions/session_actions";
import loginForm from "./loginForm";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(login(user)),
    clearErrors: () => dispatch(errorsGone()),
    // closeModal: ()=>dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(loginForm);
