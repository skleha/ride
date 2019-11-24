import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions'
import {createRide, fetchRides} from '../../actions/ride_actions'


import NewMap from './rideCreateComp'

const mapDispatchToProps = dispatch => ({
    createRide: ride => dispatch(createRide(ride)),
    closeModal: () => dispatch(closeModal()),
    fetchRides: () => dispatch(fetchRides())

});

export default connect(null, mapDispatchToProps)(NewMap)