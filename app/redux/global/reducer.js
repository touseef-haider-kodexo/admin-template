import produce from "immer";

import {
  getUserProfile,
  getMemberProfile,
  updateGlobalKey,
  logout,
  memberSignIn,
  resetCurrentUser,
} from "./actions";

import { handleActions } from "@/utils/redux-actions";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
  key: Date.now(),
};

export default handleActions(
  {
    [updateGlobalKey]: produce((draft) => {
      draft.key = Date.now();
    }),
    [logout]: produce((draft) => {
      draft.key = Date.now();
      // eslint-disable-next-line
      (draft.currentUser = null), (draft.error = null), (draft.error = null);
      draft.loading = false;
      draft.isLoggedIn = false;
    }),
    [memberSignIn]: produce((draft, { payload }) => {
      draft.currentUser = payload;
    }),
    [getUserProfile.request]: produce((draft) => {
      draft.loading = true;
      draft.error = null;
    }),
    [getUserProfile.success]: produce((draft, { payload }) => {
      draft.currentUser = payload;
      draft.loading = false;
    }),
    [getUserProfile.failure]: produce((draft, { payload }) => {
      draft.loading = false;
      draft.error = payload;
    }),
    [getMemberProfile.request]: produce((draft) => {
      draft.loading = true;
      draft.error = null;
    }),
    [getMemberProfile.success]: produce((draft, { payload }) => {
      draft.currentUser = payload;
      draft.loading = false;
    }),
    [getMemberProfile.failure]: produce((draft, { payload }) => {
      draft.loading = false;
      draft.error = payload;
    }),
    [memberSignIn.request]: produce((draft) => {
      draft.loading = true;
      draft.error = null;
    }),
    [memberSignIn.success]: produce((draft, { payload }) => {
      draft.currentUser = payload;
      draft.loading = false;
    }),
    [memberSignIn.failure]: produce((draft, { payload }) => {
      draft.loading = false;
      draft.error = payload;
    }),
    [resetCurrentUser]: produce((draft) => {
      draft.currentUser = null;
    }),
  },
  initialState,
);
