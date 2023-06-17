import { LIST_TYPES } from "./list.types";

export const fetchListStart = (userid) => ({
  type: LIST_TYPES.FETCH_LIST_START,
  payload: { userid },
});

export const fetchListSuccess = (taskList) => ({
  type: LIST_TYPES.FETCH_LIST_SUCCESS,
  payload: taskList,
});

export const fetchListFailed = (error) => ({
  type: LIST_TYPES.FETCH_LIST_FAILED,
  payload: error,
});

export const editListStart = (listId, data) => ({
  type: LIST_TYPES.EDIT_LIST_START,
  payload: { data, listId },
});

export const createListStart = (userid, listName) => ({
  type: LIST_TYPES.CREATE_LIST_START,
  payload: { userid, listName },
});

export const deleteListStart = (listId) => ({
  type: LIST_TYPES.DELETE_LIST_START,
  payload: { listId },
});
