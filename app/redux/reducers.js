/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import history from "@/utils/history";
// import languageProviderReducer from "containers/LanguageProvider/reducer";
import login from "@/containers/PageLogin/reducer";

import globalReducer from "./global/reducer";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  // eslint-disable-next-line
  const rootReducer = combineReducers({
    global: globalReducer,
    login,
    // language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
