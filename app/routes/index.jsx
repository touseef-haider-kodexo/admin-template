//
import React, { Suspense, useEffect } from "react";
import { Switch, useLocation, matchPath, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PuffLoader from "react-spinners/PuffLoader";

import { ROUTES } from "./constants";

import theme from "@/styles/theme";
import { getTokens } from "@/utils/auth";
import { getUserProfile, getMemberProfile } from "@/redux/global/actions";
import { logged_in } from "@/containers/PageLogin/actions";
import * as LS from "@/hoc/isLoading/styled";
import IsLoadingHOC from "@/hoc/isLoading/";
import ErrorPage from "@/components/ErrorPage";
import storage from "@/utils/storage";
import {
  add_claim_info,
  add_personal_info,
  add_vehicle_info,
  add_dents,
  add_technician_info,
  set_claim_id,
  add_saved_dents,
  add_rating,
  add_additional_claim_items,
  set_prev_member_email,
  set_prev_technician,
  set_prev_number,
  set_technician_notes_data,
  set_emails,
} from "@/containers/PageClaims/actions";

const AppRoutes = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  // removing claim section when the url is changing
  useEffect(() => {
    dispatch(add_personal_info(null));
    dispatch(add_dents([]));
    dispatch(add_vehicle_info(null));
    dispatch(add_technician_info(null));
    dispatch(add_claim_info(null));
    dispatch(set_claim_id(null));
    dispatch(add_saved_dents([]));
    dispatch(set_emails([]));
    dispatch(add_additional_claim_items([]));
    dispatch(add_rating(false));
    dispatch(set_technician_notes_data(null));
    dispatch(set_prev_member_email(null));
    dispatch(set_prev_technician(null));
    dispatch(set_prev_number(null));
  }, [pathname]);

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
