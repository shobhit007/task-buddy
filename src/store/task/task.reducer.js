import { TASK_TYPES } from "./task.types";

const INITIAL_STATE = {
  loading: false,
  taskError: "",
};

export const taskReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_TYPES.CREATE_TASK_START:
    case TASK_TYPES.DELETE_TASK_START:
    case TASK_TYPES.EDIT_TASK_START:
    case TASK_TYPES.UPDATE_TASK_PRIORITY_START:
    case TASK_TYPES.UPDATE_TASK_STATUS_START:
      return { ...state, loading: true };
    case TASK_TYPES.TASK_SUCCESS:
      return { ...state, loading: false };
    case TASK_TYPES.TASK_FAILED:
      return { ...state, loading: false, taskError: payload };
    default:
      return state;
  }
};
