import { GET_CURRENT_USER } from './types';
import axios from 'axios';

export function userFetched(user) {
    return {
        type: GET_CURRENT_USER,
        user 
    }
}

export function getUser(){
    return dispatch => {
        fetch(`https://localhost:44318/api/account/getUser`)
        .then(res => res.json())
        .then(res => dispatch(userFetched(res.data)))
        .catch(err => {
            console.log("-----Bad request----1", err);
        });
        console.log("xd");
    }
}