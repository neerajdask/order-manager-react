import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import { Copyright } from "./Copyright";
import Orders from './material-components/Orders'

const OrdersView = ({history}) => {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: "relative",
     
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between'
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

  const handleClick = () => {
    history.push(`/editOrder/${2}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" color="inherit" noWrap>
            Orders
          </Typography>
          <Button variant="contained" color="secondary"  onClick={handleClick}>Add Order</Button>
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
export default withRouter(OrdersView);
