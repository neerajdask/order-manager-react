import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_DETAIL_REQUEST,
  FETCH_USER_DETAIL_SUCCESS,
  FETCH_USER_DETAIL_FAILURE,
} from "../actions";

const initialState = {
  isLoading: false,
  users: {},
  error: {},
  user: {},
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        users: {},
        error: {},
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: {},
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        users: {},
        error: action.payload,
      };

    case FETCH_USER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: {},
      };

    case FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: {},
      };

    case FETCH_USER_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default users;
