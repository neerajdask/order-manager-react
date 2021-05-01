import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import Dashboard from "./material-components/Dashboard";

const Home = ({ isLoggingOut, logoutError, logoutUser }) => {
  const handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  return (
    <div>
      <Dashboard />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
  };
}
export default connect(mapStateToProps, {
})(Home);
