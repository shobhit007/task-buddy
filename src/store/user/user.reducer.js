import { USER_TYPE } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  errorMessage: "",
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_TYPE.SIGN_IN_START:
    case USER_TYPE.CHECK_USER_SESSION:
    case USER_TYPE.SING_UP_START:
      return { ...state, loading: true };
    case USER_TYPE.SIGN_IN_SUCCESS:
    case USER_TYPE.SING_UP_SUCCESS:
      return { ...state, currentUser: payload, loading: false };
    case USER_TYPE.SIGN_IN_FAILED:
    case USER_TYPE.SING_UP_FAILED:
      return { ...state, errorMessage: payload, loading: false };
    default:
      return state;
  }
};
