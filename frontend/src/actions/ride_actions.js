import * as APIUtil from "../util/ride_api_util";
import {closeModal} from '../actions/modal_actions';

export const RECEIVE_ALL_RIDES = "RECEIVE_ALL_RIDES";
export const RECEIVE_RIDE = "RECEIVE_RIDE";
export const REMOVE_RIDE = "REMOVE_RIDE";
export const RECEIVE_RIDE_ERRORS = "RECEIVE_RIDE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveRides = rides => ({
  type: RECEIVE_ALL_RIDES,
  rides
});

export const receiveRide = ride => ({
  type: RECEIVE_RIDE,
  ride
});

const removeRide = rideId => ({
  type: REMOVE_RIDE,
  rideId
})

export const receiveErrors = errors => ({
  type: RECEIVE_RIDE_ERRORS,
  errors
})

const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const fetchRides = () => dispatch => (
  APIUtil.fetchRides()
    .then(rides => {
      dispatch(receiveRides(rides))
    }, err => dispatch(receiveErrors(err.response.data)))
);

export const fetchRide = rideId => dispatch =>
  APIUtil.fetchRide(rideId)
  .then(rides => {
      dispatch(receiveRide(rides));
    }, err => dispatch(receiveErrors(err.response.data))
  );

export const createRide = ride => dispatch => (
  APIUtil.createRide(ride)
    .then(ride => {
      dispatch(receiveRide(ride));
    }, err => dispatch(receiveErrors(err.response.data)))
  );

export const updateRide = ride => dispatch =>
  APIUtil.updateRide(ride)
    .then(ride => {
      dispatch(receiveRide(ride));
    }, err => dispatch(receiveErrors(err.response.data))
  );

export const addWaypointToRide = rideIdAndWaypoint => dispatch => (
  APIUtil.addWaypointToRide(rideIdAndWaypoint)
    .then(ride => {
      dispatch(receiveRide(ride))
    }, err => dispatch(receiveErrors(err.response.data)))
);

export const deleteRide = rideId => dispatch =>
  APIUtil.deleteRide(rideId)
  .then(() => {
      dispatch(removeRide(rideId));
    }, err => dispatch(receiveErrors(err.response.data))
);

export const rideSearch = searchResult => dispatch => (
    dispatch(receiveRides(searchResult))
);

export const errorsGone = () => dispatch => dispatch(clearErrors());
