import { API } from "../api";
import { FETCH_ORDERS_FAILURE } from "./orders";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: orders,
  };
};

const fetchUsersFailure = (err) => {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: err,
  };
};

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    return API.get(`users`)
      .then((response) => {
        console.log(response);
        dispatch(fetchUsersSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err));
      });
  };
}
