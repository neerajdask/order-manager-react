import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { updateOrder, addOrder } from "../actions/orders";

let OrderForm = (props) => {
  let {
    handleSubmit,
    pristine,
    reset,
    submitting,
    id,
    orders,
    mode,
    updateOrder,
    addOrder,
    isAddingInProgress,
    isUpdateInProgress,
  } = props;
  const [item, setItem] = useState({});
  const [newTitle, setNewTitle] = useState(" ");

  const [title, setTitle] = useState(" "); // check - add mode
  const [customerName, setCustomerName] = useState(" ");
  const [street, setStreet] = useState(" ");
  const [zip, setZip] = useState(" ");
  const [city, setCity] = useState(" ");
  const [country, setCountry] = useState(" ");

  useEffect(() => {
    if (mode === "edit") {
      const found = orders.find((item) => {
        return item.uid === id;
      });
      if (found) {
        setItem(found);
        setTitle(found.title);
        setNewTitle(found.title);
      }
    }
    setTitle(" ");
    setNewTitle(" ");
  }, [id]);

  handleSubmit = () => {
    if (mode === "edit") {
      return updateOrder(item.uid, newTitle);
    }
    return addOrder(id, title, customerName, street, city, zip, country);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>

      {isAddingInProgress || isUpdateInProgress ? (
        <CircularProgress />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                value={mode === "edit" ? newTitle : title}
                onInput={(e) =>
                  mode === "edit"
                    ? setNewTitle(e.target.value)
                    : setTitle(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="customerName"
                name="customerName"
                label="Customer Name"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={
                  mode === "edit" ? item?.customer?.name || " " : customerName
                }
                onInput={(e) => setCustomerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="street"
                name="street"
                label="Street"
                fullWidth
                value={mode === "edit" ? item?.address?.street || " " : street}
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.address?.city || " " : city}
                onInput={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                value={mode === "edit" ? item?.address?.zip || " " : zip}
                fullWidth
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setZip(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={
                  mode === "edit" ? item?.address?.country || " " : country
                }
                onInput={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    isAddingInProgress: state.orders.isAddingInProgress,
    isUpdateInProgress: state.orders.isUpdateInProgress,
  };
};

OrderForm = reduxForm({
  form: "editOrderForm",
})(OrderForm);

export default connect(mapStateToProps, {
  updateOrder,
  addOrder,
})(OrderForm);
