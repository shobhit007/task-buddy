import { TASK_LIST_TYPES } from "./task-list.types";

const INITIAL_STATE = {
  taskList: [],
  filteredList: [],
  filters: new Map(),
  sorting: new Map(),
  loading: false,
  errorMessage: "",
};

export const taskListReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case TASK_LIST_TYPES.FETCH_TASKS_START:
    case TASK_LIST_TYPES.FETCH_TASKS_BY_LIST_ID_START:
    case TASK_LIST_TYPES.SET_SEARCHING_START:
      return { ...state, loading: true };
    case TASK_LIST_TYPES.SET_FILTERS:
      return { ...state, filters: payload.filters, loading: true };
    case TASK_LIST_TYPES.SET_SORTING:
      return { ...state, sorting: payload.sorting, loading: true };
    case TASK_LIST_TYPES.SET_FILTERED_LIST:
      return { ...state, filteredList: payload };
    case TASK_LIST_TYPES.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: payload,
        filteredList: payload,
      };
    case TASK_LIST_TYPES.FETCH_TASKS_FAILED:
      return { ...state, loading: false, errorMessage: payload };
    default:
      return state;
  }
};
