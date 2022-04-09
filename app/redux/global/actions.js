import { createAsyncAction, createAction } from "@/utils/redux-actions";

export const getUserProfile = createAsyncAction("GET_USER_PROFILE");

export const getMemberProfile = createAsyncAction("GET_MEMBER_PROFILE");

export const logout = createAction("LOGOUT");

export const sendPasswordEmail = createAsyncAction("SEND_PASSWORD_EMAIL");

export const updateGlobalKey = createAction("UPDATE_GLOBAL_KEY");

export const memberSignIn = createAction("MEMBER_SIGNIN");

export const resetCurrentUser = createAction("RESET_CURRENT_USER");
