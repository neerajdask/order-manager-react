import { combineReducers } from "redux";
import auth from "./auth";
import orders from "./orders";

export default combineReducers({ auth, orders });
