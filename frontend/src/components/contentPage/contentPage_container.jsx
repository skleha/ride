import { connect } from "react-redux";
import contentPage from "./contentPage";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapDispatchToProps = dispatch => ({
//   activateModal: action => dispatch(openModal(action)),
  closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(contentPage);
