import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout, login, signup, logoutUser } from './actions/session_actions';
import { fetchUser, updateUser, deleteUser } from './actions/user_actions';
import { fetchRides, fetchRide, createRide, updateRide, addWaypointToRide, deleteRide } from './util/ride_api_util';

document.addEventListener('DOMContentLoaded', () => {
    let store; 

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
        store = configureStore(preloadedState);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/login';
        }
    } else {
        store = configureStore({});
    }
    
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    window.signup = signup;
    window.login = login;
    window.logoutUser = logoutUser;
    window.fetchUser = fetchUser;
    window.updateUser = updateUser;
    window.deleteUser = deleteUser;

    window.fetchRides = fetchRides;
    window.fetchRide = fetchRide;
    window.createRide = createRide;
    window.updateRide = updateRide;
    window.addWaypointToRide = addWaypointToRide;
    window.deleteRide = deleteRide;

    ReactDOM.render(<Root store={store} />, document.getElementById('root'));
})

