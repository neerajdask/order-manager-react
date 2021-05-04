import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  UPDATE_ORDER_DETAILS_REQUEST,
  UPDATE_ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_DETAILS_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE
} from "../actions";

const initialState = {
  isLoading: false,
  orders: [],
  error: {},
  isUpdateInProgress: false,
  isAddingInProgress: false,
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
    
      case ADD_ORDER_REQUEST:
      return {
        ...state,
        isAddingInProgress: true,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        isAddingInProgress: false,
      };

    case ADD_ORDER_FAILURE:
      return {
        ...state,
        isAddingInProgress: false,
      };

    default:
      return state;
  }
};
