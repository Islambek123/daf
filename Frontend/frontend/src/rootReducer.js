import { combineReducers } from "redux";


import products from "./reducers/products";
import flashMessages from "./reducers/flashMessages";
import auth from "./reducers/auth";
import account from './reducers/account';

export default combineReducers({
    products, 
    auth,
    flashMessages,
    account
});