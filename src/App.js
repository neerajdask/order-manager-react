import React from "react";
import { Route, Switch, withRouter  } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/OrdersView";
import EditOrders from "./components/EditOrder";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        // component={Home}
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
      
      {/* <ProtectedRoute
        exact
        path="/editOrder/:id"
        component={withRouter(EditOrders)}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      /> */}

      <Route path="/login" component={Login} />
      <Route path="/edit" component={EditOrders} />
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
