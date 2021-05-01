import { combineReducers } from "redux";
import auth from "./auth";
import orders from "./orders";
import users from "./users";

export default combineReducers({ auth, orders, users });
