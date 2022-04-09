import { createAsyncAction, createAction } from "@/utils/redux-actions";

export const login = createAsyncAction("LOGIN");
export const logged_in = createAction("LOGGED_IN");
export const reset_errors = createAction("RESET_ERRORS");
