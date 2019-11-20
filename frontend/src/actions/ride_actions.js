import * as APIUtil from "../util/ride_api_util";

export const RECEIVE_ALL_RIDES = "RECEIVE_ALL_RIDES";
export const RECEIVE_RIDE = "RECEIVE_RIDE";
export const REMOVE_RIDE = "REMOVE_RIDE";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveRides = () => ({
  type: RECEIVE_ALL_RIDES,
  rides
});

const receiveRide = rideId => ({
  type: RECEIVE_RIDE,
  ride
});

const removeRide = rideId => ({
  type: REMOVE_RIDE,
  
})

