import { all, call, put, takeLatest } from "redux-saga/effects";

import { LIST_TYPES } from "./list.types";
import { fetchListSuccess, fetchListFailed } from "./list.actions";

import {
  getLists,
  createList,
  deleteList,
  updateList,
} from "../../utils/api/appwrite.api";

// Fetch all lists/categories
function* fetchTaskList({ payload: { userid } }) {
  try {
    const { documents } = yield call(getLists, userid);
    yield put(fetchListSuccess(documents));
  } catch (error) {
    yield put(fetchListFailed(error.message));
  }
}

// Create list/category
function* createListAsync({ payload: { userid, listName } }) {
  try {
    yield call(createList, userid, listName);
  } catch (error) {
    yield put(fetchListFailed(error.message));
  }
}

// Edit list/category
function* editList({ payload: { listId, data } }) {
  try {
    yield call(updateList, listId, data);
  } catch (error) {
    yield put(fetchListFailed(error.message));
  }
}

// Delete list/category
function* deleteListAsync({ payload: { listId } }) {
  try {
    yield call(deleteList, listId);
  } catch (error) {
    yield put(fetchListFailed(error.message));
  }
}

function* fetchTaskListStart() {
  yield takeLatest(LIST_TYPES.FETCH_LIST_START, fetchTaskList);
}

function* createListStart() {
  yield takeLatest(LIST_TYPES.CREATE_LIST_START, createListAsync);
}

function* editListStart() {
  yield takeLatest(LIST_TYPES.EDIT_LIST_START, editList);
}

function* deleteListStart() {
  yield takeLatest(LIST_TYPES.DELETE_LIST_START, deleteListAsync);
}

export function* listSaga() {
  yield all([
    call(fetchTaskListStart),
    call(createListStart),
    call(editListStart),
    call(deleteListStart),
  ]);
}
