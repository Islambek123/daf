import { INC_COUNTER, DEC_COUNTER } from "../actions";

const initialState={
    counterStore: 123
};

export default function counter(state=initialState, action={}) {
    switch(action.type) {
        case INC_COUNTER: {
            return Object.assign({}, state, {counterStore: state.counterStore+1});
        }
        case DEC_COUNTER: {
            return Object.assign({}, state, {counterStore: state.counterStore-1});
        }
        default: 
    }
    return state;
}