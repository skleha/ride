
import { RECEIVE_RIDE_ERRORS, CLEAR_ERRORS } from '../actions/ride_actions';

const _nullErrors = [];

const RideErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_RIDE_ERRORS:
      return Object.values(action.errors);

    case CLEAR_ERRORS:
      return _nullErrors;

    default:
      return state;
  }
}

export default RideErrorsReducer;