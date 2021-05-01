import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { connect } from "react-redux";

import { fetchOrders } from "../../actions/orders";

// Generate Order Data
function createData(id, title, date, address, customer) {
  return { id, title, date, address, customer };
}

const rows = [
  createData(
    0,
    "Harry Potter",
    "12-05-2021",
    "Elm Street, Germany",
    "Daniel Radcliff"
  ),
  createData(1, "LOTR", "12-06-2021", "Redmond avenue, Berlin", "Tom Hanks"),
  createData(
    2,
    "Get Smart",
    "14-08-2020",
    "Chuck Norris St, France",
    "Chuck Norris"
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = (props) => {
  const classes = useStyles();

  const { orders, fetchOrders } = props;

  useEffect(() => {
    fetchOrders();
    console.log(orders)
  }, []);

  return (
    <React.Fragment>
      <Title>Your orders</Title>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.customer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
  };
}

export default connect(mapStateToProps, { fetchOrders })(Orders);
