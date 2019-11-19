import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";


const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

const removeUser = userId => ({
    type: REMOVE_USER,
    userId
})

export const fetchUser = userId => dispatch => APIUtil.fetchUser(userId)
    .then( user => {
        dispatch(receiveUser(user.data))
    })

export const updateUser = req => dispatch => APIUtil.updateUser(req)
    .then( user => dispatch(receiveUser(user.data)));

export const deleteUser = userId => dispatch => APIUtil.deleteUser(userId)
    .then( () => dispatch(removeUser(userId)));