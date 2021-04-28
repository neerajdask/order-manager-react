import { API} from '../api'

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

const fetchOrdersRequest = ()=>{
    return {
        type: FETCH_ORDERS_REQUEST
    }
}

const fetchOrdersSuccess = ()=>{
    return {
        type: FETCH_ORDERS_SUCCESS
    }
}

const fetchOrdersFailure = ()=>{
    return {
        type: FETCH_ORDERS_FAILURE
    }
}

export const fetchOrders = ()=>{
    return (dispatch) => {
        dispatch(fetchOrdersRequest());
        return API.get(
          `orders`,
        )
          .then((response) => {
              console.log(response)
            //   dispatch
          })
          .catch((err) => {
            console.log(err)
            // dispatch(authError(err));
          });
      };
}