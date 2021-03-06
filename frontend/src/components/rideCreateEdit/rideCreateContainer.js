
import { connect } from "react-redux";
import { createRide } from "../../actions/ride_actions";
import RideCreateEdit from "./rideCreateEdit";
import { openModal, closeModal } from "../../actions/modal_actions";

const mapStateToProps = state => ({
  newRide: {
    title: "",
    duration: "",
    author_rating: 0,
    author_id: state.session.user.id,
    author_name: state.session.user.username,
    description: "",
    start_address: "",
    start_city: "",
  },
  user: "user data",
  formType: "Create a Ride"
});

const mapDispatchToProps = dispatch => ({
  createRide: ride => dispatch(createRide(ride)),
  activateModal: (action, id) => dispatch(openModal(action, id)),
  closeModal: () => dispatch(closeModal()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(RideCreateEdit);

