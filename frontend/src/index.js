import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from "./actions/session_actions";
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
            window.location.href = '/#/';
        }
    } else {
        store = configureStore({});
    }
    

    ReactDOM.render(<Root store={store} />, document.getElementById('root'));
})

