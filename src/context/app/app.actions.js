import { ACTION_TYPES } from "./app.types";

// Set priorities to filter
export const setPriorities =
  (value, filters, onSelectClose, callback) => (dispatch) => {
    const updatedFilters = new Map(filters);
    const priorities = filters.get("priorities")
      ? new Set(filters.get("priorities"))
      : new Set();

    if (priorities.has(value)) {
      priorities.delete(value);
    } else {
      priorities.add(value);
    }

    if (!updatedFilters.has("priorities")) {
      updatedFilters.set("priorities", priorities);
    } else if (priorities?.size === 0) {
      updatedFilters.delete("priorities");
    } else {
      updatedFilters.delete("priorities");
      updatedFilters.set("priorities", priorities);
    }

    const status = updatedFilters.get("status");
    const updatedPriorities = updatedFilters.get("priorities");
    const date = updatedFilters.get("date");

    dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: updatedFilters });
    callback({
      status,
      selectedDate: date,
      priorities: updatedPriorities,
    });
    onSelectClose();
  };

// Set status to filters
export const setStatus =
  (value, filters, onSelectClose, callback) => (dispatch) => {
    const updatedFilters = new Map(filters);

    if (!updatedFilters.has("status")) {
      updatedFilters.set("status", value);
    } else {
      updatedFilters.delete("status");
      updatedFilters.set("status", value);
    }

    const status = updatedFilters.get("status");
    const updatedPriorities = updatedFilters.get("priorities");
    const date = updatedFilters.get("date");
    dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: updatedFilters });
    callback({
      status,
      selectedDate: date,
      priorities: updatedPriorities,
    });
    onSelectClose();
  };

// Set date to filters
export const setDate =
  (date, filters, onSelectClose, callback) => (dispatch) => {
    const updatedFilters = new Map(filters);

    if (!updatedFilters.has("date")) {
      updatedFilters.set("date", date);
    } else {
      updatedFilters.delete("date");
      updatedFilters.set("date", date);
    }

    const status = updatedFilters.get("status");
    const updatedPriorities = updatedFilters.get("priorities");
    dispatch({
      type: ACTION_TYPES.SET_FILTERS,
      payload: updatedFilters,
    });
    callback({
      status,
      selectedDate: date,
      priorities: updatedPriorities,
    });
    onSelectClose();
  };

export const clearFilter = (filters, filterValue, callback) => (dispatch) => {
  const updatedFilters = new Map(filters);

  updatedFilters.delete(filterValue);

  const status = updatedFilters.get("status");
  const priorities = updatedFilters.get("priorities");
  const date = updatedFilters.get("date");

  dispatch({ type: ACTION_TYPES.SET_FILTERS, payload: updatedFilters });
  callback({
    status,
    selectedDate: date,
    priorities,
  });
};
