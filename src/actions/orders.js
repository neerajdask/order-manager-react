import { API } from "../api";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

const fetchOrdersRequest = () => {
  return {
    type: FETCH_ORDERS_REQUEST,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: orders,
  };
};

const fetchOrdersFailure = (err) => {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: err,
  };
};

export function fetchOrders() {
  return (dispatch) => {
    dispatch(fetchOrdersRequest());
    return API.get(`orders`)
      .then((response) => {
        console.log(response);
        dispatch(fetchOrdersSuccess(response));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailure(err));
      });
  };
}
