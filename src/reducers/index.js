import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import orders from "./orders";
import users from "./users";

export default combineReducers({ auth, orders, users, form: formReducer });
