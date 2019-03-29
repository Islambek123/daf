import { USER_GOT } from "../actions/types";
const initialState = {
    user: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case USER_GOT:{
            return {
                user: action.user
            }
        }
        default:
            return state;
    }
}