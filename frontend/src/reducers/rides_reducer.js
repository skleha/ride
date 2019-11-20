
import { RECEIVE_ALL_RIDES, RECEIVE_RIDE, REMOVE_RIDE } from '../actions/ride_actions';

export default function(state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_ALL_RIDES:
      action.rides.data.forEach(ride => {
        newState[ride._id] = ride;
      });
      return newState;

    case RECEIVE_RIDE:
      newState[action.ride.data._id] = action.ride.data;
      return newState;

    case REMOVE_RIDE:
      delete newState[action.rideId]
      return newState;

    default:
      return state;

  }
}