import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
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
    isAddSuccess,
    isAddFailure,
    isUpdateSuccess,
    isUpdateFailure,
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

  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const openSnackBar = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      closeSnackBar();
      history.push("/orders");
    }, 3000);
  };

  const closeSnackBar = (event) => {
    setOpen(false);
  };

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
        addOrder(title, customerName, street, city, zip, country);
      }
      return;
      // return history.push("/orders");
    }
  };

  useEffect(() => {
    if (isAddSuccess) {
      openSnackBar("Added order successfully!");
    } else if (isUpdateSuccess) {
      openSnackBar("Updated order successfully!");
    } else if (isAddFailure) {
      openSnackBar("Oops, something went wrong. Please try again later.");
    } else if (isUpdateFailure) {
      openSnackBar("Oops, something went wrong. Please try again later.");
    }
  });

  const handleCancel = () => {
    history.push("/orders");
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
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
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id='title'
                name='title'
                label='Title'
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
                id='customerName'
                name='customerName'
                label='Customer Name'
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.customer?.name : customerName}
                onInput={(e) => setCustomerName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                id='street'
                name='street'
                label='Street'
                fullWidth
                value={mode === "edit" ? item?.address?.street : street}
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id='city'
                name='city'
                label='City'
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.address?.city : city}
                onInput={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id='zip'
                name='zip'
                label='Zip / Postal code'
                value={mode === "edit" ? item?.address?.zip : zip}
                fullWidth
                disabled={mode === "edit" ? true : false}
                onInput={(e) => setZip(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required={true}
                id='country'
                name='country'
                label='Country'
                fullWidth
                disabled={mode === "edit" ? true : false}
                value={mode === "edit" ? item?.address?.country : country}
                onInput={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                className={classes.margin}
                color='primary'
                type='submit'
                onClick={handleSubmit}>
                Submit
              </Button>

              <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={closeSnackBar}
          message={message}
        />
      </>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    isAddingInProgress: state.orders.isAddingInProgress,
    isUpdateInProgress: state.orders.isUpdateInProgress,
    isAddSuccess: state.orders.isAddSuccess,
    isAddFailure: state.orders.isAddFailure,
    isUpdateSuccess: state.orders.isUpdateSuccess,
    isUpdateFailure: state.orders.isUpdateFailure,
  };
};

OrderForm = reduxForm({
  form: "editOrderForm",
})(OrderForm);

export default connect(mapStateToProps, {
  updateOrder,
  addOrder,
})(OrderForm);