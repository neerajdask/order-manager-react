import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
  } from "../actions";
  
  const initialState = {
    isLoading: false,
    users: {},
    error: {},
  }
  
const users =  (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          isLoading: true,
          orders: {},
          error: {},
        };
      
        case FETCH_USERS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          orders: action.payload.users,
          error: {},
        };
      
        case FETCH_USERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          orders: {},
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  
  export default users;