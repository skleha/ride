import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import SignUpContainer from "../signupForm/signupForm_container";
import LogInContainer from "../loginForm/loginForm_container"
import RideCreateContainer from "../rideCreateEdit/rideCreateContainer";
import RideCreateMapContainer from "../rideCreateEdit/rideCreateMapContainer";


function Modal({ modal, content, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "signupUser":
      component = <SignUpContainer />;
      break;
    case "loginUser":
        component = <LogInContainer />;
      break;
    case "rideCreate":
        component = <RideCreateContainer />;
      break;
    case "2ndPostForm":
        component = <RideCreateMapContainer content={content}/>;
      break;
  
    // case 'signup':
    //   component = <SignupFormContainer />;
    //   break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modal.modal,
    content: state.modal.info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
