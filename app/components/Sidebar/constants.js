import { ROLES } from "@/utils/constants";
import tpaIcon from "@/assets/images/tpa.svg";
import claimIcon from "@/assets/images/claim.svg";
import technicianIcon from "@/assets/images/technician.svg";
import dashboardIcon from "@/assets/images/dashboard.svg";
import systemIcon from "@/assets/images/system.svg";

export const ITEMS = [
  {
    label: "Dashboard",
    url: "/",
    roles: [
      ROLES.admin.value,
      ROLES.accountManager.value,
      ROLES.tpaAccountManager.value,
      ROLES.tpaAdmin.value,
    ],
    subUrls: ["/notifications", "/recent-claim-activity"],
    icon: dashboardIcon,
  },
  {
    label: "Claims",
    url: "/claims",
    roles: [
      ROLES.admin.value,
      ROLES.accountManager.value,
      ROLES.tpaAccountManager.value,
      ROLES.tpaAdmin.value,
    ],
    subUrls: ["/add-claim", "/edit-claim"],
    icon: claimIcon,
  },
  {
    label: "Technicians",
    url: "/technicians",
    roles: [ROLES.admin.value, ROLES.accountManager.value],
    subUrls: ["/technicians/edit", "/technicians/add"],
    icon: technicianIcon,
  },
  {
    label: "TPA",
    url: "/tpa",
    roles: [ROLES.admin.value, ROLES.accountManager.value],
    subUrls: ["/tpa/add", "/tpa/edit"],
    icon: tpaIcon,
  },
  {
    label: "System",
    url: "/systems/users",
    roles: [
      ROLES.admin.value,
      ROLES.accountManager.value,
      ROLES.tpaAdmin.value,
    ],
    subUrls: [
      "/systems/users/add",
      "/systems/users/user",
      "/systems/category-defaults",
    ],
    icon: systemIcon,
    childs: [
      {
        label: "Users",
        url: "/systems/users",
        roles: [
          ROLES.admin.value,
          ROLES.accountManager.value,
          ROLES.tpaAccountManager.value,
          ROLES.tpaAdmin.value,
        ],
      },
      {
        label: "Category",
        url: "/systems/category-defaults",
        roles: [ROLES.admin.value, ROLES.accountManager.value],
      },
    ],
  },
];
