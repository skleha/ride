import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions'
import {createRide} from '../../actions/ride_actions'


import NewMap from './rideCreateComp'

const mapDispatchToProps = dispatch => ({
    createRide: ride => dispatch(createRide(ride)),

    closeModal: () => dispatch(closeModal()),

});

export default connect(null, mapDispatchToProps)(NewMap)