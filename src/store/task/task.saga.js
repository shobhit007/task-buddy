import { all, call, put, takeLatest } from "redux-saga/effects";

import { TASK_TYPES } from "./task.types";
import { taskFailed, taskSuccess } from "./task.action";

import {
  createNewTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  updateTaskPriority,
} from "../../utils/api/appwrite.api";

// Create task
function* createTaskAsync({ payload: { userid, data } }) {
  try {
    yield call(createNewTask, userid, data);
    yield put(taskSuccess());
  } catch (error) {
    yield put(taskFailed(error.message));
  }
}

// Delete task
function* deleteTaskAsync({ payload: { taskId } }) {
  try {
    yield call(deleteTask, taskId);
    yield put(taskSuccess());
  } catch (error) {
    yield put(taskFailed(error.message));
  }
}

// Update task
function* editTaskAsync({ payload: { taskId, data } }) {
  try {
    yield call(updateTask, taskId, data);
    yield put(taskSuccess());
  } catch (error) {
    yield put(taskFailed(error.message));
  }
}

// Update task status
function* updateTaskStatusAsync({ payload: { taskId, status } }) {
  try {
    yield call(updateTaskStatus, taskId, status);
    yield put(taskSuccess());
  } catch (error) {
    yield put(taskFailed(error.message));
  }
}
// Update task priority
function* updateTaskPriorityAsync({ payload: { taskId, priority } }) {
  try {
    yield call(updateTaskPriority, taskId, priority);
    yield put(taskSuccess());
  } catch (error) {
    yield put(taskFailed(error.message));
  }
}

function* createTaskStart() {
  yield takeLatest(TASK_TYPES.CREATE_TASK_START, createTaskAsync);
}

function* editTaskStart() {
  yield takeLatest(TASK_TYPES.EDIT_TASK_START, editTaskAsync);
}

function* deleteTaskStart() {
  yield takeLatest(TASK_TYPES.DELETE_TASK_START, deleteTaskAsync);
}

function* updateTaskStatusStart() {
  yield takeLatest(TASK_TYPES.UPDATE_TASK_STATUS_START, updateTaskStatusAsync);
}

function* updateTaskPriorityStart() {
  yield takeLatest(
    TASK_TYPES.UPDATE_TASK_PRIORITY_START,
    updateTaskPriorityAsync
  );
}

export function* taskSagas() {
  yield all([
    call(createTaskStart),
    call(editTaskStart),
    call(deleteTaskStart),
    call(updateTaskPriorityStart),
    call(updateTaskStatusStart),
  ]);
}
