import axios from 'axios';

export function register(data){
    return dispatch => {
        return axios.post('https://localhost:44318/api/auth/register', data);
    }
}