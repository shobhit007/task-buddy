import { LINEUPS_TYPES } from "./lineups.types";

const INITIAL_STATE = {
  lineups: [],
  loading: false,
  listError: "",
};

export const lineUpReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LINEUPS_TYPES.FETCH_LINEUPS_START:
    case LINEUPS_TYPES.CREATE_LINEUPS_START:
    case LINEUPS_TYPES.DELETE_LINEUPS_START:
    case LINEUPS_TYPES.EDIT_LINEUPS_START:
      return { ...state, loading: true };
    case LINEUPS_TYPES.FETCH_LINEUPS_SUCCESS:
      return { ...state, loading: false, lineups: payload };
    case LINEUPS_TYPES.FETCH_LINEUPS_FAILED:
      return { ...state, loading: false, listError: payload };
    default:
      return state;
  }
};
