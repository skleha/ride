
import { connect } from "react-redux";
import { createRide, deleteRide,fetchRides } from "../../actions/ride_actions";
import RideCreateEdit from "./rideCreateEdit";
import { openModal, closeModal } from "../../actions/modal_actions";


const mapDispatchToProps = dispatch => ({
    createRide: ride => dispatch(createRide(ride)),
    activateModal: (action, id) => dispatch(openModal(action, id)),
    closeModal: () => dispatch(closeModal()),
    deleteRide: (rideId) => dispatch(deleteRide(rideId)),
    fetchRides: () => dispatch(fetchRides())
});

export default connect(null, mapDispatchToProps)(RideCreateEdit);