import { all, call, put, takeLatest } from "redux-saga/effects";

import { TASK_LIST_TYPES } from "./task-list.types";
import { fetchTaskListFailed, fetchTaskListSuccess } from "./task-list.actions";

import {
  getListOfTasks,
  getListOfTasksByListId,
  filterTaskList,
} from "../../utils/api/appwrite.api";

// Fetch tasks for a user
function* fetchTaskList({ payload: { userid } }) {
  try {
    const { documents } = yield call(getListOfTasks, userid);
    yield put(fetchTaskListSuccess(documents));
  } catch (error) {
    yield put(fetchTaskListFailed(error.message));
  }
}

// Fetch tasks for a user by list/category id
function* fetchTaskListById({ payload: { userid, listId } }) {
  try {
    const { documents } = yield call(getListOfTasksByListId, userid, listId);
    yield put(fetchTaskListSuccess(documents));
  } catch (error) {
    yield put(fetchTaskListFailed(error.message));
  }
}

// Filters
function* setFiltersAsync({ payload: { userid, filters, listId } }) {
  const status = filters.get("status") || null;
  const priorities = filters.get("priorities") || null;
  const selectedDate = filters.get("date") || null;
  try {
    const { documents } = yield call(filterTaskList, userid, {
      status,
      priorities,
      selectedDate,
      list_id: listId,
    });
    yield put(fetchTaskListSuccess(documents));
  } catch (error) {
    console.log(error);
    yield put(fetchTaskListFailed(error.message));
  }
}

// Sorting
function* setSortingAsync({ payload: { userid, sorting, filters, listId } }) {
  const status = filters.get("status") || null;
  const priorities = filters.get("priorities") || null;
  const selectedDate = filters.get("date") || null;

  const applyFilters = { status, priorities, selectedDate, list_id: listId };

  try {
    const { documents } = yield call(
      filterTaskList,
      userid,
      applyFilters,
      sorting
    );
    yield put(fetchTaskListSuccess(documents));
  } catch (error) {
    console.log(error);
    yield put(fetchTaskListFailed(error.message));
  }
}

function* fetchTaskListStart() {
  yield takeLatest(TASK_LIST_TYPES.FETCH_TASKS_START, fetchTaskList);
}

function* fetchTaskListByListIdStart() {
  yield takeLatest(
    TASK_LIST_TYPES.FETCH_TASKS_BY_LIST_ID_START,
    fetchTaskListById
  );
}

function* setFilterStart() {
  yield takeLatest(TASK_LIST_TYPES.SET_FILTERS, setFiltersAsync);
}

function* setSortingStart() {
  yield takeLatest(TASK_LIST_TYPES.SET_SORTING, setSortingAsync);
}

export function* taskListSaga() {
  yield all([
    call(fetchTaskListStart),
    call(fetchTaskListByListIdStart),
    call(setFilterStart),
    call(setSortingStart),
  ]);
}
