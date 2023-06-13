import { ACTION_TYPES } from "./app.types";

export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_FILTERS:
      return { ...state, filters: payload };
    default:
      return state;
  }
};
