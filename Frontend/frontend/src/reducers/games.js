import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED } from "../actions";
export default function games(state=[], action={}) {
    switch (action.type) {
        case SET_GAMES:
            return action.games;
        case ADD_GAME:
            return [
                ...state,
                action.game
            ];

        case GAME_DELETED:
            return state.filter(item => item.id != action.gameId);
        case GAME_FETCHED:
            const index = state.findIndex(item => item.id == action.game.id);
            if (index > -1) {
                return state.map(item => {
                    if (item.id == action.game.id) return action.game;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.game
                ]
            }

        case GAME_UPDATED:
        //return Object.assign({}, state, action.game);
            return state.map(item => {
                if (item.id == action.game.id) return action.game;
                return item;
            });
        default: return state;
    }
}