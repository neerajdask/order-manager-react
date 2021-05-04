import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  UPDATE_ORDER_DETAILS_REQUEST,
  UPDATE_ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_DETAILS_FAILURE,
} from "../actions";

const initialState = {
  isLoading: false,
  orders: [],
  error: {},
  isUpdateInProgress: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        orders: [],
        error: {},
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        error: {},
      };

    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        orders: [],
        error: action.payload.error,
      };

    case UPDATE_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };

    case UPDATE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_ORDER_DETAILS_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
