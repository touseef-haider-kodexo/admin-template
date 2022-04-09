import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const GenericAuth = ({ component: Component, roles, ...rest }) => (
  <Route {...rest}>
    <Component title={rest?.title} />
  </Route>
);

GenericAuth.propTypes = {
  component: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default GenericAuth;
