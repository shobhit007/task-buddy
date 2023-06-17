import { LIST_TYPES } from "./list.types";

const INITIAL_STATE = {
  list: [],
  loading: false,
  listError: "",
};

export const listReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_TYPES.FETCH_LIST_START:
    case LIST_TYPES.CREATE_LIST_START:
    case LIST_TYPES.EDIT_LIST_START:
    case LIST_TYPES.DELETE_LIST_START:
      return { ...state, loading: true };
    case LIST_TYPES.FETCH_LIST_SUCCESS:
      return { ...state, loading: false, list: payload };
    case LIST_TYPES.FETCH_LIST_FAILED:
      return { ...state, loading: false, listError: payload };
    default:
      return state;
  }
};
