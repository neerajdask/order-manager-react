import { API } from "../api";

import { history } from "../history/history";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE";

export const UPDATE_ORDER_DETAILS_REQUEST = "UPDATE_ORDER_DETAILS_REQUEST";
export const UPDATE_ORDER_DETAILS_SUCCESS = "UPDATE_ORDER_DETAILS_SUCCESS";
export const UPDATE_ORDER_DETAILS_FAILURE = "UPDATE_ORDER_DETAILS_FAILURE";

export const RESET_OPERATION_STATUS = "RESET_OPERATION_STATUS";

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

const updateOrderRequest = () => {
  return {
    type: UPDATE_ORDER_DETAILS_REQUEST,
  };
};

const updateOrderSuccess = (data) => {
  return {
    type: UPDATE_ORDER_DETAILS_SUCCESS,
    payload: data,
  };
};

const updateOrderFailure = (err) => {
  return {
    type: UPDATE_ORDER_DETAILS_FAILURE,
    payload: err,
  };
};

const addOrderRequest = () => {
  return {
    type: ADD_ORDER_REQUEST,
  };
};

const addOrderSuccess = () => {
  return {
    type: ADD_ORDER_SUCCESS,
  };
};

const addOrderFailure = () => {
  return {
    type: ADD_ORDER_FAILURE,
  };
};

export function resetStatus() {
  return {
    type: RESET_OPERATION_STATUS,
  };
}

export function fetchOrders() {
  return (dispatch) => {
    dispatch(fetchOrdersRequest());
    return API.get(`orders`)
      .then((response) => {
        dispatch(fetchOrdersSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchOrdersFailure(err));
      });
  };
}

export function updateOrder(id, newTitle) {
  return (dispatch) => {
    dispatch(updateOrderRequest());
    return API.put(`orders/${id}`, {
      title: newTitle,
      bookingDate: new Date().getTime(),
    })
      .then((res) => {
        console.log(res.data);
        dispatch(updateOrderSuccess(res.data));
        history.push("/orders");
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateOrderFailure(err));
        history.push("/orders");
      })
      .finally(() => {
        history.push("/orders");
      });
  };
}

export function addOrder(title, customerName, street, city, zip, country) {
  return (dispatch) => {
    dispatch(addOrderRequest());
    return API.post(`orders`, {
      title,
      customer: {
        email: "ned@das.com",
        name: customerName,
        phone: "0123456789",
      },
      address: {
        street,
        city,
        zip,
        country,
      },
      bookingDate: new Date().getTime(),
    })
      .then((res) => {
        console.log(res.data);
        dispatch(addOrderSuccess(res.data));
        history.push("/orders");
      })
      .catch((err) => {
        console.log(err);
        dispatch(addOrderFailure(err));
        history.push("/orders");
      })
      .finally(() => {
        history.push("/orders");
      });
  };
}
