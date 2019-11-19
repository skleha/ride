import { connect } from "react-redux";
import Navbar from "./navbar";
import { withRouter } from "react-router-dom";
// import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProp = state => ({
  // viewing: state.location,
//   currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
//   activateModal: (action, id) => dispatch(openModal(action, id)),
//   closeModal: () => dispatch(closeModal()),
//   logout: () => dispatch(logout())
});

export default connect(mapStateToProp, mapDispatchToProps)(Navbar);
