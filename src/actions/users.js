import { API } from "../api";

export const FETCH_USER_DETAIL_REQUEST = "FETCH_USER_DETAIL_REQUEST";
export const FETCH_USER_DETAIL_SUCCESS = "FETCH_USER_DETAIL_SUCCESS";
export const FETCH_USER_DETAIL_FAILURE = "FETCH_USER_DETAIL_FAILURE";

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (user) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: user,
  };
};

const fetchUsersFailure = (err) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: err,
  };
};

const fetchUserDetailRequest = () => {
  return {
    type: FETCH_USER_DETAIL_REQUEST,
  };
};

const fetchUserDetailSuccess = (user) => {
  return {
    type: FETCH_USER_DETAIL_SUCCESS,
    payload: user,
  };
};

const fetchUserDetailFailure = (err) => {
  return {
    type: FETCH_USER_DETAIL_FAILURE,
    payload: err,
  };
};

export function fetchUsers() {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    return API.get(`users`)
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err));
      });
  };
}

export function fetchUserDetail(id) {
  return (dispatch) => {
    dispatch(fetchUserDetailRequest());
    return API.get(`users/${id}`)
      .then((response) => {
        dispatch(fetchUserDetailSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchUserDetailFailure(err));
      });
  };
}
