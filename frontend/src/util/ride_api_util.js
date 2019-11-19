import axios from "axios";

export const fetchRide = rideId => {
  return axios.get(`/api/rides/${rideId}`);
};

export const fetchRides = () => {
  return axios.get(`/api/rides`);
};

export const createRide = req => {
  return axios.post(`/api/rides/`, req);
};

export const updateRide = req => {
  return axios.patch(`/api/rides/${req._id}`, req);
};

export const addWaypointToRide = req => {
  return axios.patch(`/api/rides/${req._id}/addwaypoint`, req);
};

export const deleteRide = rideId => {
  return axios.delete(`/api/rides/${rideId}`);
};
