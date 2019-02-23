import axios from "axios";

export const INC_COUNTER='INCREMENT';
export const DEC_COUNTER='DECREMENT';

export const SET_GAMES='SET_GAMES';
export const ADD_GAME="ADD_GAME";
export const GAME_FETCHED="GAME_FETCHED";
export const GAME_UPDATED="GAME_UPDATED";
export const GAME_DELETED="GAME_DELETED";


export function setGames(games) {
    return {
        type: SET_GAMES,
        games
    };
}
export function addGame(game) {
    return{
        type:ADD_GAME,
        game
    }
}
export function gameFetched(game) {
    return {
        type: GAME_FETCHED,
        game 
    }
}
export function gameUpdated(game) {
    return {
        type: GAME_UPDATED,
        game 
    }
}
export function gameDeleted(gameId) {
    return {
        type: GAME_DELETED,
        gameId 
    }
}

export function saveGame(data){

    return dispatch => {
        return axios.post(`http://localhost:44318/api/Game`, data)
          .then(resp => {
              //throw new Error('sss');
              console.log("---Data insert by Redux---", resp.data);
            dispatch(addGame(resp.data))
          });
      };
}
export function updateGame(data){

    return dispatch => {
        return axios.put(`http://localhost:44318/api/Game/${data.id}`, data)
          .then(resp => {
              //throw new Error('sss');
              console.log("---Data updated by Redux---", resp.data);
            dispatch(gameUpdated(resp.data))
          });
      };
}

export function fetchGames() {
    return dispatch => {
        fetch('http://localhost:44318/api/game')
        .then(res => res.json())
        .then(data => dispatch(setGames(data)))
        .catch(err => {
            console.log("-----Bad request----", err);
        });
    }
}

export function fetchGame(id) {
    return dispatch => {
        fetch(`http://localhost:44318/api/game/${id}`)
        .then(res => res.json())
        .then(data => dispatch(gameFetched(data)))
        .catch(err => {
            console.log("-----Bad request----", err);
        });
    }
}

export function deleteGame(id){

    return dispatch => {
        return axios.delete(`http://localhost:44318/api/Game/${id}`)
          .then(resp => {
              //throw new Error('sss');
              console.log("---Data updated by Redux---", resp.data);
            dispatch(gameDeleted(id))
          });
      };
}