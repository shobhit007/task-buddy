import { TASKS_TYPES } from "./tasks.types";

import {
  getListOfTasks,
  createNewTask,
  completeTask,
  deleteTask,
  updateTask,
  getTasksByStatus,
  tasksAscByDate,
  tasksDescByDate,
  tasksByDate,
  taskByPriority,
} from "../../utils/api/appwrite.api";

const fetchTaskListStart = () => ({ type: TASKS_TYPES.FETCH_TASKS_START });

const fetchTaskListSuccess = (taskList) => ({
  type: TASKS_TYPES.FETCH_TASKS_SUCCESS,
  payload: taskList,
});

const fetchTaskListFailed = (error) => ({
  type: TASKS_TYPES.FETCH_TASKS_FAILED,
  payload: error,
});

// Fetch all tasks
export const fetchTaskList = (user) => async (dispatch) => {
  if (!user) return;
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await getListOfTasks(user.$id);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    dispatch(fetchTaskListFailed(error.message));
  }
};

// Get tasks by status(pending/complete)
export const fetchTaskListByStatus = (user, status) => async (dispatch) => {
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await getTasksByStatus(user.$id, status);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    dispatch(fetchTaskListFailed(error.message));
  }
};

// Get tasks in asc order by createdAt
export const fetchTaskListAsc = (user) => async (dispatch) => {
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await tasksAscByDate(user.$id);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    dispatch(fetchTaskListFailed(error.message));
  }
};

// Get tasks in desc order by createdAt
export const fetchTaskListDesc = (user) => async (dispatch) => {
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await tasksDescByDate(user.$id);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    dispatch(fetchTaskListFailed(error.message));
  }
};

// Get tasks by date
export const fetchTaskListByDate = (user, date) => async (dispatch) => {
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await tasksByDate(user.$id);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    dispatch(fetchTaskListFailed(error.message));
  }
};

// Get tasks by priority
export const fetchTaskListByPriorities =
  (user, priorities) => async (dispatch) => {
    dispatch(fetchTaskListStart());
    try {
      const { documents } = await taskByPriority(user.$id, priorities);
      dispatch(fetchTaskListSuccess(documents));
    } catch (error) {
      dispatch(fetchTaskListFailed(error.message));
    }
  };

// Create a new task
export const createTask = async (user, data) => {
  try {
    const task = await createNewTask(user.$id, data);
    console.log(task);
  } catch (error) {
    console.log(error);
  }
};

// Update status by complete a task
export const completeTaskAsync = async (taskId) => {
  try {
    const task = await completeTask(taskId);
    console.log(task);
  } catch (error) {
    console.log(error);
  }
};

// Delete a task
export const deleteTaskAsync = async (taskId) => {
  try {
    await deleteTask(taskId);
  } catch (error) {
    console.log(error);
  }
};

// Update a task
export const updateTaskAsync = async (taskId, data) => {
  try {
    const task = await updateTask(taskId, data);
    console.log(task);
  } catch (error) {
    console.log(error);
  }
};
