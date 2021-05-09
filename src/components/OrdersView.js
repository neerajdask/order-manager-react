import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import { resetStatus } from "../actions/orders";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { Copyright } from "./Copyright";
import Orders from "./material-components/Orders";

const OrdersView = (props) => {
  const { history, resetStatus } = props;

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
    iconContainer: {
      display: "flex",
      justifyContent: "space-between",
      // flex-direction: row;
      alignItems: "center",
    },
    homeIcon: {
      marginRight: "36px",
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

  const navigate = (path) => {
    history.push(path);
  };

  useEffect(() => {
    resetStatus();
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='absolute' color='primary' className={classes.appBar}>
        <Toolbar
          className={classes.toolBar}
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}>
          <div className={classes.iconContainer}>
            <HomeIcon className={classes.homeIcon} />
            <Typography variant='h6' color='inherit' noWrap>
              Orders
            </Typography>
          </div>
          <Button
            variant='contained'
            color='secondary'
            onClick={(e) => {
              e.stopPropagation();
              navigate("/addOrder");
            }}>
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
    </React.Fragment>
  );
};

export default connect(null, { resetStatus })(withRouter(OrdersView));
