import * as APIUtil from "../util/ride_api_util";

export const RECEIVE_ALL_RIDES = "RECEIVE_ALL_RIDES";
export const RECEIVE_RIDE = "RECEIVE_RIDE";
export const REMOVE_RIDE = "REMOVE_RIDE";

const receiveRides = rides => ({
  type: RECEIVE_ALL_RIDES,
  rides
});

const receiveRide = ride => ({
  type: RECEIVE_RIDE,
  ride
});

const removeRide = rideId => ({
  type: REMOVE_RIDE,
  rideId
})

export const fetchRides = () => dispatch => (
  APIUtil.fetchRides()
    .then(rides => dispatch(receiveRides(rides)))
);

export const fetchRide = rideId => dispatch => (
  APIUtil.fetchRide(rideId)
    .then(rides => dispatch(receiveRide(rides)))
);

export const createRide = ride => dispatch => (
  APIUtil.createRide(ride)
    .then(ride => dispatch(receiveRide(ride)))
);

export const updateRide = ride => dispatch => (
  APIUtil.updateRide(ride)
    .then(ride => dispatch(receiveRide(ride)))
);

export const addWaypointToRide = rideIdAndWaypoint => dispatch => (
  APIUtil.addWaypointToRide(rideIdAndWaypoint)
    .then(ride => dispatch(receiveRide(ride)))
);

export const deleteRide = rideId => dispatch => (
  APIUtil.deleteRide(rideId)
    .then( () => dispatch(removeRide(rideId)))
);