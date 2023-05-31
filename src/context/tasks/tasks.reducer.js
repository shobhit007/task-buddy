import { TASKS_TYPES } from "./tasks.types";

export const taskReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TASKS_TYPES.FETCH_TASKS_START:
      return { ...state, loading: true };
    case TASKS_TYPES.FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, taskList: payload };
    case TASKS_TYPES.FETCH_TASKS_FAILED:
      return { ...state, loading: false, errorMessage: payload };
    default:
      return state;
  }
};
