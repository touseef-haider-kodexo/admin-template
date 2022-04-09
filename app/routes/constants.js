import { lazy } from "react";

import { ROLES } from "@/utils/constants";

import RouteAuth from "./RouteAuth";
import RouteUnauth from "./RouteUnauth";
import GenericAuth from "./GenericAuth";

const LoginEmail = lazy(() => import("@/containers/PageLogin"));
const Dashboard = lazy(() => import("@/containers/PageDashboard"));

export const ROUTES = [
  {
    path: "/",
    component: Dashboard,
    routeComponent: RouteAuth,
    exact: true,
    roles: [
      ROLES.admin.value,
    ],
    title: "Dashboard",
  },
  {
    path: "/login",
    component: LoginEmail,
    routeComponent: RouteUnauth,
    roles: [],
  },
  
  {
    path: "/forgot/:token?",
    component: RecoverPassword,
    routeComponent: RouteUnauth,
    roles: [],
  },

  {
    path: "/notifications",
    component: Notifications,
    routeComponent: RouteAuth,
    roles: [
      ROLES.admin.value,
      ROLES.accountManager.value,
      ROLES.tpaAccountManager.value,
      ROLES.tpaAdmin.value,
    ],
    title: "Notifications",
  },
  {
    path: "/recent-claim-activity",
    component: RecentActivity,
    routeComponent: RouteAuth,
    roles: [
      ROLES.admin.value,
      ROLES.accountManager.value,
      ROLES.tpaAccountManager.value,
      ROLES.tpaAdmin.value,
    ],
  },
  
];
