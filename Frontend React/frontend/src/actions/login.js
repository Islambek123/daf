import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('https://localhost:44318/api/auth/login', data);
    }
}