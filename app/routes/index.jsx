//
import React, { Suspense, useEffect } from "react";
import { Switch, useLocation, matchPath, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PuffLoader from "react-spinners/PuffLoader";

import theme from "@/styles/theme";
import { getTokens } from "@/utils/auth";
import { getUserProfile, getMemberProfile } from "@/redux/global/actions";
import { logged_in } from "@/containers/PageLogin/actions";
import * as LS from "@/hoc/isLoading/styled";
import IsLoadingHOC from "@/hoc/isLoading/";
import ErrorPage from "@/components/ErrorPage";
import storage from "@/utils/storage";

import { ROUTES } from "./constants";

const AppRoutes = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isPwdRecoverPage = matchPath(pathname, {
    path: "/forgot/:token?",
  });

  const state = useSelector(({ global, login }) => ({
    login,
    global,
  }));
  const {
    global: { currentUser, error, key, loading },
  } = state;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const { access_token } = getTokens();
    const claimId = params.get("id") || "";
    const storageClaimId = storage.get("claimId") || "";

    if (access_token && claimId && storageClaimId) {
      dispatch(logged_in(false));
      dispatch(getMemberProfile.request());
    } else if (
      access_token &&
      !currentUser &&
      !storageClaimId &&
      !isPwdRecoverPage
    ) {
      dispatch(getUserProfile.request());
      dispatch(logged_in(true));
    } else if (access_token && isPwdRecoverPage && !error) {
      dispatch(getUserProfile.request());
    }
  }, [key]);

  return (
    <Suspense
      fallback={
        <LS.Container>
          <PuffLoader
            color={theme.colors.deepblue}
            loading={Boolean(true)}
            size={60}
          />
        </LS.Container>
      }
    >
      <Switch>
        {ROUTES.map(
          ({ path, routeComponent: RouteComponent, roles, ...rest }) => (
            <RouteComponent key={path} path={path} roles={roles} {...rest} />
          ),
        )}
        {!loading && (
          <Route
            component={() => (
              <ErrorPage
                status={404}
                title={"We can't seem to find that."}
                subTitle="The page you are looking for doesn't exist or has been moved."
              />
            )}
          />
        )}
      </Switch>
    </Suspense>
  );
};

AppRoutes.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default IsLoadingHOC(AppRoutes, "message");
