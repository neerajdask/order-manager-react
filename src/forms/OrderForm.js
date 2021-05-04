import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { reduxForm } from "redux-form";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
        setTitle(found.title); // check
        setNewTitle(found.title);
      }
    }
  }, [id]);

  handleSubmit = () => {
    console.log(newTitle);
    if (mode === "edit") {
      return updateOrder(item.uid, newTitle);
    }
    // return addOrder(id, title, customerName, city, country, street, zip); // add params. check id
    return addOrder(title, customerName, city, country, street, zip); // add params. check id
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>

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
              value={mode === "edit" ? newTitle : ""}
              onInput={(e) => setNewTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="customerName"
              name="customerName"
              label="Customer Name"
              fullWidth
              disabled={mode === "edit" ? true : false}
              value={mode === "edit" ? item?.customer?.name || " " : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="street"
              name="street"
              label="Street"
              fullWidth
              value={mode === "edit" ? item?.address?.street || " " : " "}
              disabled={mode === "edit" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              disabled={mode === "edit" ? true : false}
              value={mode === "edit" ? item?.address?.city || " " : " "}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              label="Zip / Postal code"
              value={mode === "edit" ? item?.address?.zip || " " : " "}
              fullWidth
              disabled={mode === "edit" ? true : false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              fullWidth
              disabled={mode === "edit" ? true : false}
              value={mode === "edit" ? item?.address?.country || " " : ""}
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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
  };
};

OrderForm = reduxForm({
  form: "editOrderForm",
})(OrderForm);

export default connect(mapStateToProps, {
  updateOrder,
  addOrder,
})(OrderForm);
