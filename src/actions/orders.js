import { API } from "../api";

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
      .then((res) => {
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
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
        dispatch(updateOrderSuccess(res.data));
      })
      .catch((err) => {
        dispatch(updateOrderFailure(err));
      });
  };
}

export function addOrder(
  title,
  customerName,
  email,
  phone,
  street,
  city,
  zip,
  country
) {
  return (dispatch) => {
    dispatch(addOrderRequest());
    return API.post(`orders`, {
      title,
      customer: {
        email,
        name: customerName,
        phone,
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
        dispatch(addOrderSuccess(res.data));
      })
      .catch((err) => {
        dispatch(addOrderFailure(err));
      });
  };
}
