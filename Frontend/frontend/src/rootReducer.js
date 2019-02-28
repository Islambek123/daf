import { combineReducers } from "redux";

import counter from "./reducers/counter";
import products from './reducers/products';
import auth from './reducers/auth';

export default combineReducers({
    counter,
    products, 
    auth
});