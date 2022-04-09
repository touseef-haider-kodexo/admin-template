import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteUnauth = (props) => {
  const state = useSelector(({ global, login }) => ({
    login,
    global,
  }));
  const {
    global: { currentUser },
    login: { isLoggedIn },
  } = state;

  if (currentUser && isLoggedIn) return <Redirect to="/" />;

  return <Route {...props} />;
};

export default RouteUnauth;
