import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = userData => {
  return axios.post("/api/users/register", userData);
};

export const login = userData => {
  return axios.post("/api/users/login", userData);
};

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
}

export const deleteUser = userId => {
    return axios.delete(`/api/users/${userId}`)
}

export const updateUser = req => {
    return axios.patch(`/api/users/${req.id}`, req)
}