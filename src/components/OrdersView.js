import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";

import { Copyright } from "./Copyright";
import Orders from "./material-components/Orders";
import { connect } from "react-redux";

const OrdersView = (props) => {
  const {
    history,
    isAddSuccess,
    isAddFailure,
    isUpdateSuccess,
    isUpdateFailure,
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    appBar: {
      position: "relative",
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between",
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const openSnackBar = (message) => {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      closeSnackBar();
    }, 3000);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addNewOrder = () => {
    history.push(`/addOrder`);
  };

  useEffect(() => {
    // if(isAddSuccess) {
    //   openSnackBar('Added order successfully!');
    // }else if(isUpdateSuccess) {
    //   openSnackBar('Updated order successfully!');
    // }else if(isAddFailure) {
    //   openSnackBar('Oops, something went wrong. Please try again later.');
    // }else if(isUpdateFailure) {
    //   openSnackBar('Oops, something went wrong. Please try again later.');
    // }
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" color="inherit" noWrap>
            Orders
          </Typography>
          <Button variant="contained" color="secondary" onClick={addNewOrder}>
            Add Order
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Orders />
        </Paper>
        <Copyright />
      </main>

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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAddSuccess: state.orders.isAddSuccess,
    isAddFailure: state.orders.isAddFailure,
    isUpdateSuccess: state.orders.isUpdateSuccess,
    isUpdateFailure: state.orders.isUpdateFailure,
  };
};
export default connect(mapStateToProps)(withRouter(OrdersView));
