import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export function login(data) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/auth/login', data)
            .then(res => {
                var token = res.data;
                console.log('--get token serve--', token);
                var user = jwt.decode(token);
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
            });
    }
}

export function register(data) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/auth/register', data);
    }
}