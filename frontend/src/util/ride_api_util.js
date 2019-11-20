import axios from "axios";

export const fetchRides = () => {
  return axios.get(`/api/rides`);
}

export const fetchRide = rideId => {
  return axios.get(`/api/rides/${rideId}`);
};

export const createRide = ride => {
  return axios.post(`/api/rides/`, ride);
};

export const updateRide = ride => {
  return axios.patch(`/api/rides/${ride._id}`, ride);
};

export const addWaypointToRide = rideIdAndWaypoint => {
  return axios.patch(
    `/api/rides/${rideIdAndWaypoint._id}/addwaypoint`,
    rideIdAndWaypoint
  );
};

export const deleteRide = rideId => {
  return axios.delete(`/api/rides/${rideId}`);
};
