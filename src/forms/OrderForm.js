import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { updateOrder, addOrder } from "../actions/orders";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

let OrderForm = (props) => {
  let {
    handleSubmit,
    id,
    orders,
    mode,
    updateOrder,
    addOrder,
    isAddingInProgress,
    isUpdateInProgress,
    history,
  } = props;

  const classes = useStyles();

  const [item, setItem] = useState({});
  const [newTitle, setNewTitle] = useState("");
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      const found = orders.find((item) => {
        return item.uid === id;
      });
      if (found) {
        setItem(found);
        setNewTitle(found.title);
      }
    }
  }, [id]);

  handleSubmit = () => {
    if (mode === "edit") {
      if (newTitle) {
        return updateOrder(item.uid, newTitle);
      }
      return;
    } else {
      if (title && title && customerName && street && city && zip && country) {
        addOrder(item.uid, title, customerName, street, city, zip, country);
      }
      return;
      // return history.push("/orders");
    }
  };

  const handleCancel = () => {
    history.push("/orders");
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>

      {isAddingInProgress || isUpdateInProgress ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
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
                required={true}
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
                required={true}
                id="customerName"
                name="customerName"
                label="Customer Name"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.customer?.name : customerName}
                onInput={(e) => setCustomerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                id="street"
                name="street"
                label="Street"
                fullWidth
                value={mode === "edit" ? item?.address?.street : street}
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id="city"
                name="city"
                label="City"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.address?.city : city}
                onInput={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id="zip"
                name="zip"
                label="Zip / Postal code"
                value={mode === "edit" ? item?.address?.zip : zip}
                fullWidth
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setZip(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id="country"
                name="country"
                label="Country"
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.address?.country : country}
                onInput={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.margin}
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleCancel}
              >
                Cancel
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
