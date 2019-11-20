import { connect } from "react-redux";
import Navbar from "./navbar";
import { withRouter } from "react-router-dom";
import { openModal, closeModal } from "../../actions/modal_actions";
import {logout} from "../../actions/session_actions"

const mapStateToProp = state => ({
  // viewing: state.location,
      signedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  activateModal: (action, id) => dispatch(openModal(action, id)),
  closeModal: () => dispatch(closeModal()),
  logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Navbar));
