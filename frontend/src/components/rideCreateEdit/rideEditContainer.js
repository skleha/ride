
import { connect } from "react-redux";
import { createRide } from "../../actions/ride_actions";
import RideCreateEdit from "./rideCreateEdit";
import { openModal, closeModal } from "../../actions/modal_actions";


const mapDispatchToProps = dispatch => ({
    createRide: ride => dispatch(createRide(ride)),
    activateModal: (action, id) => dispatch(openModal(action, id)),
    closeModal: () => dispatch(closeModal()),

});

export default connect(null, mapDispatchToProps)(RideCreateEdit);