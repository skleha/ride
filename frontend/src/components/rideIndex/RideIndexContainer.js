
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import rideIndex from "./RideIndex";
import { fetchRides } from "../../actions/ride_actions";
import { openModal, closeModal } from "../../actions/modal_actions";


const mapStateToProps = state => ({
  rides: Object.values(state.rides),
  signedIn: state.session.isAuthenticated,
  currentUserId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchRides: () => dispatch(fetchRides()),
  activateModal: (action, id) => dispatch(openModal(action, id)),
  // closeModal: () => dispatch(closeModal()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(rideIndex));
