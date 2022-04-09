/* eslint-disable */
// This file is only for the customized accordion component which contain many things

export const disableCancelButton = (currentUser, ROLES, props, claimInfo) => {
  if (currentUser?.role === ROLES.admin.value) {
    return false;
  }
  if (currentUser?.role === ROLES.member.value) {
    if (props?.is_added_by_member && !claimInfo?.has_updated_by_member) {
      return false;
    }
    return true;
  }
  if (currentUser?.role === ROLES.tpaAdmin.value) {
    if (props?.created_by?.role === ROLES.tpaAdmin.value) {
      return false;
    }
    return true;
  }
  if (currentUser?.role === ROLES.tpaAccountManager.value) {
    if (props?.created_by?.role === ROLES.tpaAccountManager.value) {
      return false;
    }
    return true;
  }
  if (currentUser?.role === ROLES.accountManager.value) {
    if (props?.created_by?.role === ROLES.accountManager.value) {
      return false;
    }
    return true;
  }
};

export const showCloseButton = (currentUser, ROLES, claimInfo, val) => {
  if (currentUser?.role === ROLES.admin.value) {
    return true;
  }
  if (currentUser?.role === ROLES.member.value) {
    if (val?.is_uploaded_by_member && !claimInfo?.has_updated_by_member) {
      return true;
    }
    return false;
  }
  if (currentUser?.role === ROLES.tpaAdmin.value) {
    if (val?.uploaded_by?.role === ROLES.tpaAdmin.value) {
      return true;
    }
    return false;
  }
  if (currentUser?.role === ROLES.tpaAccountManager.value) {
    if (val?.uploaded_by?.role === ROLES.tpaAccountManager.value) {
      return true;
    }
    return false;
  }
  if (currentUser?.role === ROLES.accountManager.value) {
    if (val?.uploaded_by?.role === ROLES.accountManager.value) {
      return true;
    }
    return false;
  }
};

export const showUI = (currentUser, ROLES, props) => {
  if (currentUser?.role === ROLES.admin.value) {
    return true;
  }
  if (currentUser?.role === ROLES.accountManager.value) {
    if (props?.created_by?.role === ROLES.admin.value) {
      return false;
    }
    return true;
  }
  return false;
};

export const showNotesAndHistory = (currentUser, ROLES) => {
  if (
    currentUser?.role === ROLES.admin.value ||
    currentUser?.role === ROLES.accountManager.value
  ) {
    return true;
  }
  return false;
};

export const showDescription = (currentUser, ROLES, claimInfo, props) => {
  if (currentUser?.role === ROLES.admin.value) {
    return false;
  }
  if (currentUser?.role === ROLES.member.value) {
    if (!props?.is_added_by_member && !claimInfo?.has_updated_by_member) {
      return true;
    }
    return false;
  }
  if (currentUser?.role === ROLES.tpaAdmin.value) {
    if (props?.created_by?.role === ROLES.admin.value) {
      return true;
    }
    return false;
  }
  if (currentUser?.role === ROLES.tpaAccountManager.value) {
    if (
      props?.created_by?.role === ROLES.tpaAdmin.value ||
      props?.created_by?.role === ROLES.admin.value ||
      props?.created_by?.role === ROLES.accountManager.value
    ) {
      return true;
    }
    return false;
  }
};
