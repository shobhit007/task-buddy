import { all, call, put, takeLatest } from "redux-saga/effects";

import { LINEUPS_TYPES } from "./lineups.types";
import { fetchLineUpsSuccess, fetchLineUpsFailed } from "./lineups.actions";

import {
  lineups,
  createLineup,
  deleteLineUp,
} from "../../utils/api/appwrite.api";

// Fetch all lists/categories
function* fetchLineUps({ payload: { userid } }) {
  try {
    const { documents } = yield call(lineups, userid);
    yield put(fetchLineUpsSuccess(documents));
  } catch (error) {
    yield put(fetchLineUpsFailed(error.message));
  }
}

// Create list/category
function* createLineUpAsync({ payload: { userid, taskId } }) {
  try {
    yield call(createLineup, userid, taskId);
  } catch (error) {
    yield put(fetchLineUpsFailed(error.message));
  }
}

// Delete list/category
function* deleteLineUpAsync({ payload: { lineupId } }) {
  try {
    yield call(deleteLineUp, lineupId);
  } catch (error) {
    console.log(error);
    yield put(fetchLineUpsFailed(error.message));
  }
}

function* fetchLineUpsStart() {
  yield takeLatest(LINEUPS_TYPES.FETCH_LINEUPS_START, fetchLineUps);
}

function* createLineUpStart() {
  yield takeLatest(LINEUPS_TYPES.CREATE_LINEUPS_START, createLineUpAsync);
}

function* deleteLineUpStart() {
  yield takeLatest(LINEUPS_TYPES.DELETE_LINEUPS_START, deleteLineUpAsync);
}

export function* lineupSaga() {
  yield all([
    call(fetchLineUpsStart),
    call(createLineUpStart),
    call(deleteLineUpStart),
  ]);
}
