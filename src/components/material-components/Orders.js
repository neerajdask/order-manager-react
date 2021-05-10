import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

import Title from "./Title";
import { fetchOrders } from "../../actions/orders";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  editIcon: {
    fontSize: "1rem",
  },
}));

const Orders = (props) => {
  const classes = useStyles();

  const { orders, fetchOrders, isLoading, history, location } = props;

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/orders") {
      if (orders.length === 0) {
        fetchOrders();
      }
      setShowMore(true);
    }
  }, []);

  const handleItemClick = (id) => {
    history.push(`/editOrder/${id}`);
  };

  const viewMoreOrders = () => {
    setShowMore(false);
    history.push(`/orders`);
  };

  const getDate = (bookingDate) => {
    const bDate = new Date(bookingDate);
    return bDate.toDateString();
  };

  return (
    <React.Fragment>
      <Title>Your orders</Title>
      {isLoading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Customer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showMore
              ? orders?.splice(0, 7).map((order) => (
                  <TableRow key={order?.uid}>
                    <TableCell>{order?.title}</TableCell>
                    <TableCell>{getDate(order?.bookingDate)}</TableCell>
                    <TableCell>{order?.address?.city}</TableCell>
                    <TableCell>{order?.customer?.name}</TableCell>

                    <TableCell>
                      <EditIcon
                        size='small'
                        className={classes.editIcon}
                        onClick={() => {
                          handleItemClick(order.uid);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : orders?.map((order) => (
                  <TableRow key={order?.uid}>
                    <TableCell>{order?.title}</TableCell>
                    <TableCell>{getDate(order?.bookingDate)}</TableCell>
                    <TableCell>{order?.address?.city}</TableCell>
                    <TableCell>{order?.customer?.name}</TableCell>

                    <TableCell>
                      <EditIcon
                        size='small'
                        className={classes.editIcon}
                        onClick={() => {
                          handleItemClick(order.uid);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      )}
      {showMore ? (
        <div className={classes.seeMore}>
          <Link color='primary' onClick={viewMoreOrders}>
            See more orders
          </Link>
        </div>
      ) : null}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    error: state.orders.error,
    isLoading: state.orders.isLoading,
  };
}

export default connect(mapStateToProps, { fetchOrders })(withRouter(Orders));
