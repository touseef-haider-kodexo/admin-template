import produce from "immer";

import { handleActions } from "@/utils/redux-actions";

import { logged_in, login, reset_errors } from "./actions";

const initialState = {
  errors: null,
  isLoggedIn: false,
  loading: false,
};

export default handleActions(
  {
    [reset_errors]: produce((draft) => {
      draft.errors = null;
      draft.loading = false;
    }),
    [logged_in]: produce((draft, { payload }) => {
      draft.isLoggedIn = payload;
    }),
    [login.request]: produce((draft) => {
      draft.errors = initialState.error;
      draft.loading = true;
    }),

    [login.success]: produce((draft) => {
      draft.errors = initialState.error;
      draft.isLoggedIn = true;
      draft.loading = false;
    }),
    [login.failure]: produce((draft, { payload }) => {
      draft.errors = payload;
      draft.isLoggedIn = true;
      draft.loading = false;
    }),
  },
  initialState,
);
