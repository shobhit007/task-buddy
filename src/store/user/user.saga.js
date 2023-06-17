import { USER_TYPE } from "./user.types";

import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  createUserSession,
  getUserAccount,
  createUserAccount,
  deleteCurrentSession,
} from "../../utils/api/appwrite.api";

import { signInFailed, signInSuccess } from "./user.actions";

// Signin
function* signinUser({ payload: { email, password } }) {
  try {
    const user = yield call(createUserSession, email, password);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

// Signup
function* signupUser({ payload: { email, password, name } }) {
  try {
    yield call(createUserAccount, email, password, name);
    yield call(signinUser, { payload: { email, password } });
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

// Log out user
function* logoutUser() {
  try {
    yield call(deleteCurrentSession);
    yield put(signInSuccess(null));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

// Check user session
function* isUserAuthenticated() {
  try {
    const user = yield call(getUserAccount);
    if (!user) return;
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

function* signinStart() {
  yield takeLatest(USER_TYPE.SIGN_IN_START, signinUser);
}

function* signupStart() {
  yield takeLatest(USER_TYPE.SING_UP_START, signupUser);
}

function* logOutStart() {
  yield takeLatest(USER_TYPE.LOG_OUT_START, logoutUser);
}

function* checkUserSession() {
  yield takeLatest(USER_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(signinStart),
    call(checkUserSession),
    call(signupStart),
    call(logOutStart),
  ]);
}
