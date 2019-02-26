import { combineReducers } from "redux";

import counter from "./reducers/counter";
import products from './reducers/products';

export default combineReducers({
    counter,
    products
});