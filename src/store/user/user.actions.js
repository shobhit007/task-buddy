import { USER_TYPE } from "./user.types";

export const signInStart = (email, password) => ({
  type: USER_TYPE.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: USER_TYPE.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailed = (error) => ({
  type: USER_TYPE.SIGN_IN_FAILED,
  payload: error,
});

export const signupStart = (email, password, name) => ({
  type: USER_TYPE.SING_UP_START,
  payload: { email, password, name },
});

export const logOutStart = () => ({ type: USER_TYPE.LOG_OUT_START });

export const checkUserSession = () => ({ type: USER_TYPE.CHECK_USER_SESSION });
