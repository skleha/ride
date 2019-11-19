import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout, signup } from './actions/session_actions';
import { fetchUser, updateUser, deleteUser } from './actions/user_actions';

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
    window.fetchUser = fetchUser;
    window.updateUser = updateUser;
    window.deleteUser = deleteUser;

    ReactDOM.render(<Root store={store} />, document.getElementById('root'));
})

