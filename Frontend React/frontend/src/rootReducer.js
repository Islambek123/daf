import { combineReducers } from "redux";

import counter from "./reducers/counter";
import games from "./reducers/games";
import products from './reducers/products';

export default combineReducers({
    counter,
    games,
    products
});