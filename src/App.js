import React from "react";
import { Route, Switch, withRouter  } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/OrdersView";
import EditOrders from "./components/EditOrder";
import AddOrder from "./components/AddOrder";

/**TODO
 * Add Snackbar on order update and addition. https://material-ui.com/components/snackbars/
 * Add spinner while above action is ongoing. -- DONE
 * Refactor code- remove and condense multiple components if possible
 * Dashboard -- Make sidebar and appbar common.
 * User action-reducer to be filled with functionality.
 * Adjust protected Routes -- DONE
 * Documentation
 * Clear console.log
 * Test
 * Deploy -- OPTIONAL.
 */

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={withRouter(Home)}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      
      <ProtectedRoute
        exact
        path="/orders"
        component={withRouter(OrdersView)}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      
      <ProtectedRoute
        exact
        path="/editOrder/:id"
        component={withRouter(EditOrders)}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      
      <ProtectedRoute
        exact
        path="/addOrder"
        component={withRouter(AddOrder)}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      <Route path="/login" component={Login} />
      {/* <Route path="/orders" component={OrdersView} />
      <Route path="/editOrder/:id" component={EditOrders} />
      <Route path="/addOrder" component={AddOrder} /> */}
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
