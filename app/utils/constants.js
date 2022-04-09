export const storageKeys = {
  REFRESH_TOKEN: "refresh_token",
  ACCESS_TOKEN: "access_token",
  role: "role",
};

export const carTypes = {
  PassengerCar: {
    type: 0,
    carType: "passenger car",
  },
  MultipurposePassengerVehicle: {
    type: 1,
    carType: "multipurpose passenger vehicle (mpv)",
  },
  Motorcycle: {
    type: 2,
    carType: "motorcycle",
  },
  Truck: {
    type: 3,
    carType: "truck ",
  },
  IncompleteVehicle: {
    type: 4,
    carType: "incomplete vehicle",
  },
  Bus: {
    type: 5,
    carType: "bus",
  },
  Trailer: {
    type: 6,
    carType: "trailer",
  },
  LowSpeedVehicle: {
    type: 7,
    carType: "low speed vehicle (lsv)",
  },
  Interior: {
    type: 10,
    carType: "interior",
  },
  Exterior: {
    type: 10,
    carType: "exterior",
  },
};

export const ROLES = {
  admin: { value: "admin", label: "Admin" },
  accountManager: { value: "account_manager", label: "Account Manager" },
  tpaAdmin: { value: "tpa_admin", label: "TPA Admin" },
  tpaAccountManager: {
    value: "tpa_account_manager",
    label: "TPA Account Manager",
  },
  member: { value: "member", label: "Member" },
};

export const _ROLES = [
  { value: ROLES.admin.value, label: ROLES.admin.label },
  { value: ROLES.accountManager.value, label: ROLES.accountManager.label },
  { value: ROLES.tpaAdmin.value, label: ROLES.tpaAdmin.label },
  {
    value: ROLES.tpaAccountManager.value,
    label: ROLES.tpaAccountManager.label,
  },
  {
    value: ROLES.member.value,
    label: ROLES.member.label,
  },
];

export const TPA_ACCESS_LEVEL = [
  { value: ROLES.tpaAdmin.value, label: ROLES.tpaAdmin.label },
  {
    value: ROLES.tpaAccountManager.value,
    label: ROLES.tpaAccountManager.label,
  },
];

export const ROLES_ = {
  admin: "Admin",
  account_manager: "Account Manager",
  tpa_admin: "TPA Admin",
  tpa_account_manager: "TPA Account Manager",
  member: "Member",
};

export const EMAIL_REG_EXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

export const CLAIM_STATUS = {
  in_process: { value: "in_process", label: "In Process" },
  completed: { value: "completed", label: "Completed" },
  schedule: { value: "schedule", label: "Schedule" },
  pending: { value: "pending", label: "Pending" },

  pending_verification: {
    value: "pending_verification",
    label: "Pending Verification",
  },
  follow_up: { value: "follow_up", label: "Follow Up" },
  closed: { value: "closed", label: "Closed" },
  complete: { value: "complete", label: "Complete" },
};
export const CLAIM_STATUS_ARRAY = [
  { value: "in_process", label: "In Process" },
  { value: "completed", label: "Completed" },
  { value: "scheduled", label: "Schedule" },
  { value: "pending", label: "Pending" },
  { value: "pending_verification", label: "Pending Verification" },
  { value: "follow_up", label: "Follow Up" },
  { value: "closed", label: "Closed" },
];
export const TPA_CLAIM_CREATED = "Email/SMS TPA Claim Created";
export const TECHNICIAN_ASSIGNMENT = "Email/SMS Tech Assignment";
export const STATUS_REQUEST = "Email/SMS Status Request";
export const TECHNICIAN_CLAIM_ASSIGNMENT =
  "Email/SMS Technician Claim Assignment";
export const CONFIRMATION_OF_CLAIM =
  "Email/SMS Confirmation/Verification of Claim";

export const EMAIL_NOTIFICATIONS = {
  customer: [
    {
      label: CONFIRMATION_OF_CLAIM,
      value: CONFIRMATION_OF_CLAIM,
    },
    {
      label: TECHNICIAN_ASSIGNMENT,
      value: TECHNICIAN_ASSIGNMENT,
    },
  ],
  tpa: [
    {
      label: TPA_CLAIM_CREATED,
      value: TPA_CLAIM_CREATED,
    },
  ],
  technician: [
    {
      label: TECHNICIAN_CLAIM_ASSIGNMENT,
      value: TECHNICIAN_CLAIM_ASSIGNMENT,
    },
  ],
};
