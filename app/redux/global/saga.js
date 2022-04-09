import { call, put, takeLatest, all } from "redux-saga/effects";
// import { push } from "connected-react-router";

import { getUserProfile, getMemberProfile } from "./actions";

import AuthService from "@/services/api/auth-service";
import AppService from "@/services/api/app-service";
import { logged_in } from "@/containers/PageLogin/actions";
import storage from "@/utils/storage";
import { ROLES } from "@/utils/constants";

function* getUserProfileTask() {
  try {
    const profile = yield call([AuthService, AuthService.getProfile]);
    yield put(getUserProfile.success(profile));
    // yield put(logged_in(true));
  } catch ({ message }) {
    console.log(`error--->`, { message });
    yield put(getUserProfile.failure({ message }));
    yield put(logged_in(false));

    // yield put(push("/login"));
  }
}
function* getUserProfileTaskForMember() {
  try {
    const claim = yield call(
      [AppService, AppService.getParticularClaim],
      storage.get("claimId"),
    );
    yield put(
      getMemberProfile.success({
        ...claim?.personal_info,
        role: ROLES.member.value,
      }),
    );
  } catch ({ message }) {
    console.log(`error--->`, { message });
    yield put(getMemberProfile.failure({ message }));
    // yield put(push("/login"));
  }
}

export default function* globalSaga() {
  yield all([
    takeLatest(getUserProfile.request, getUserProfileTask),
    takeLatest(getMemberProfile.request, getUserProfileTaskForMember),
  ]);
}
