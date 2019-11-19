import axios from 'axios';

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
}

export const deleteUser = userId => {
    return axios.delete(`/api/users/${userId}`)
}

export const updateUser = req => {
    return axios.patch(`/api/users/${req._id}`, req)
}