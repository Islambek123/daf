import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) {
    return dispatch => { 
        return dispatch({
            type: ADD_FLASH_MESSAGE,
            message
        });
    }   
}
export function deleteFlashMessage(id) {
    return dispatch => { 
        return dispatch({
            type: DELETE_FLASH_MESSAGE,
            id
        });
    }   
    // return {
    //   type: DELETE_FLASH_MESSAGE,
    //   id
    // }
  }