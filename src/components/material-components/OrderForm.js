import React from "react";
import Grid from "@material-ui/core/Grid";
import { reduxForm } from "redux-form";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

let OrderForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Details
      </Typography>

      <form
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              fullWidth

              // autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="customerName"
              name="customerName"
              label="Customer Name"
              fullWidth
              disabled
              // autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              disabled
              // autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              disabled
              // autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              disabled
              // autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              disabled
              // autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              fullWidth
              disabled
              // autoComplete="shipping country"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="bookingDate"
              name="bookingDate"
              label="Booking Date"
              fullWidth
              // autoComplete="shipping country"
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

OrderForm = reduxForm({
  form: "editOrderForm",
})(OrderForm);

export default OrderForm;
