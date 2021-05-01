import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from "../actions";

const initialState = {
  isLoading: false,
  orders: {},
  error: {},
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        orders: {},
        error: {},
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        error: {},
      };

    case FETCH_ORDERS_FAILURE:
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
