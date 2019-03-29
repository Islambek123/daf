import { USER_GOT } from './types';
import axios from 'axios';

export function userGot(user) {
    return {
        type: USER_GOT,
        user
    }
}

export function fetchUser() {
    return dispatch => {
        return axios.get('https://localhost:44318/api/account/user')
            .then(res => {
                dispatch(userGot(res.data))
            })
            .catch(err => {
                console.log("Bad request fetch user", err);
            });
    }
}

export function validateToken(data){
    return () => {
        return axios.post('https://localhost:44318/api/account/token', data)
            .then(res => {
                console.log("Confirm Token Reposnse", res.data);
            })
            .catch(err => {
                console.log("Bad request for token validation.", err);
            });
    }
}