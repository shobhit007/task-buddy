import { TASK_LIST_TYPES } from "./task-list.types";

// Fetch all task start
export const fetchTaskListStart = (userid) => ({
  type: TASK_LIST_TYPES.FETCH_TASKS_START,
  payload: { userid },
});

// Fetch tasks by list/category id
export const fetchTaskListByListIdStart = (userid, listId) => ({
  type: TASK_LIST_TYPES.FETCH_TASKS_BY_LIST_ID_START,
  payload: { userid, listId },
});

export const fetchTaskListSuccess = (taskList) => ({
  type: TASK_LIST_TYPES.FETCH_TASKS_SUCCESS,
  payload: taskList,
});

export const fetchTaskListFailed = (error) => ({
  type: TASK_LIST_TYPES.FETCH_TASKS_FAILED,
  payload: error,
});

// Filters
export const filterByStatus = (
  key,
  value,
  userid,
  filters,
  listId,
  onSelectClose
) => {
  const updatedFilters = new Map(filters);
  if (!updatedFilters.has(key)) {
    updatedFilters.set(key, value);
  } else {
    updatedFilters.delete(key);
    updatedFilters.set(key, value);
  }

  onSelectClose();
  return {
    type: TASK_LIST_TYPES.SET_FILTERS,
    payload: { userid, filters: updatedFilters, listId },
  };
};

export const filterByCreatedDate = (
  key,
  value,
  userid,
  filters,
  listId,
  onSelectClose
) => {
  const updatedFilters = new Map(filters);
  if (!updatedFilters.has(key)) {
    updatedFilters.set(key, value);
  } else {
    updatedFilters.delete(key);
    updatedFilters.set(key, value);
  }

  onSelectClose();
  return {
    type: TASK_LIST_TYPES.SET_FILTERS,
    payload: { userid, filters: updatedFilters, listId },
  };
};

export const filterByPriorities = (
  key,
  value,
  userid,
  filters,
  listId,
  onSelectClose
) => {
  const updatedFilters = new Map(filters);
  const updatedPriorities = updatedFilters.get(key)
    ? new Set(updatedFilters.get(key))
    : new Set();

  if (updatedPriorities.has(value)) {
    updatedPriorities.delete(value);
  } else {
    updatedPriorities.add(value);
  }

  if (!updatedFilters.has(key)) {
    updatedFilters.set(key, updatedPriorities);
  } else {
    updatedFilters.delete(key);
    updatedFilters.set(key, updatedPriorities);
  }

  onSelectClose();
  return {
    type: TASK_LIST_TYPES.SET_FILTERS,
    payload: { userid, filters: updatedFilters, listId },
  };
};

// Clear filter from Filter map
export const clearFilter = (filters, listId, filterKey, userid) => {
  const updatedFilters = new Map(filters);

  updatedFilters.delete(filterKey);

  return {
    type: TASK_LIST_TYPES.SET_FILTERS,
    payload: { userid, filters: updatedFilters, listId },
  };
};

// Sorting
export const setSorting = (key, value, sorting, filters, listId, userid) => {
  const updatedSorting = new Map(sorting);

  if (!updatedSorting.has(key)) {
    // Add new key value pair
    updatedSorting.set(key, value);
  } else {
    // Delete previous value for existing key
    updatedSorting.delete(key);
    // Add new value for existing key
    updatedSorting.set(key, value);
  }

  return {
    type: TASK_LIST_TYPES.SET_SORTING,
    payload: { sorting: updatedSorting, userid, filters, listId },
  };
};

// Clear sorting from sorting map
export const clearSorting = (key, sorting, filters, listId, userid) => {
  const updatedSorting = new Map(sorting);

  updatedSorting.delete(key);

  return {
    type: TASK_LIST_TYPES.SET_SORTING,
    payload: { userid, sorting: updatedSorting, filters, listId },
  };
};

// Search
export const setFilteredList = (list) => ({
  type: TASK_LIST_TYPES.SET_FILTERED_LIST,
  payload: list,
});
