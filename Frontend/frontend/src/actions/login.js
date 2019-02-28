import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import { setAuthorizationToken} from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export function login(data) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/auth/login', data)
            .then(resp => {
                const token = resp.data;
                //console.log('--get token serve--', jwt.decode(token));
                localStorage.setItem('jwtToken', token);
                //localStorage.setItem('user', JSON.stringify(user));
                //setAuthorizationToken(token);
                //dispatch(setCurrentUser(user));
            });
    }
}