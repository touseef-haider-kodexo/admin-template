import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { getTokens } from "@/utils/auth";
import ErrorPage from "@/components/ErrorPage";

const RouteAuth = ({ component: Component, roles, ...rest }) => {
  const { currentUser } = useSelector((state) => state.global);
  const { access_token } = getTokens();

  if (!currentUser && !access_token) {
    return <Redirect from="*" to="/login" />;
  }

  if (access_token && currentUser && !roles.includes(currentUser?.role)) {
    return (
      <Route
        component={() => (
          <ErrorPage
            status={404}
            title={"We can't seem to find that."}
            subTitle="The page you are looking for doesn't exist or has been moved."
          />
        )}
      />
    );
  }

  return (
    <Route {...rest}>
      <Component title={rest?.title} />
    </Route>
  );
};

RouteAuth.propTypes = {
  component: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default RouteAuth;
