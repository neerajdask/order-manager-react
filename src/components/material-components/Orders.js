import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@material-ui/core/CircularProgress';

import Title from "./Title";
import { connect } from "react-redux";

import { fetchOrders } from "../../actions/orders";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = (props) => {
  const classes = useStyles();

  const { orders, fetchOrders, isLoading} = props;

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleItemClick = (id)=> {
    alert(`clicked ${id}`)
  }

  return (
    <React.Fragment>
      <Title>Your orders</Title>
      {isLoading ? 
       <CircularProgress /> :
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Customer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order?.id}  onClick={()=>{handleItemClick(order.id)}}>
                  <TableCell>{order?.title}</TableCell>
                  <TableCell>{order?.bookingDate}</TableCell>
                  <TableCell>{order?.address?.city}</TableCell>
                  <TableCell>{order?.customer?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }
      {/* <div className={classes.seeMore}>
        <Link color="primary" onClick="viewMoreOrders">
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    isLoading: state.orders.isLoading
  };
}

export default connect(mapStateToProps, { fetchOrders })(Orders);
