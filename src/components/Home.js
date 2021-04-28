import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import Dashboard from "./material-components/Dashboard";

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <Dashboard/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError
    };
  }
  export default connect(mapStateToProps)(Home);