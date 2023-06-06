import { TASKS_TYPES } from "./tasks.types";

import {
  getListOfTasks,
  createNewTask,
  completeTask,
  deleteTask,
  updateTask,
  tasksAscByDate,
  tasksDescByDate,
  filterTaskList,
  createList,
  getUserLists,
  getListOfTasksByName,
  updateTaskStatus,
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

// Fetch all tasks
export const fetchTaskListByName = (user, listId) => async (dispatch) => {
  if (!user) return;
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await getListOfTasksByName(user.$id, listId);
    dispatch(fetchTaskListSuccess(documents));
  } catch (error) {
    console.log(error);
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

export const filteredList = (user, filters, sorting) => async (dispatch) => {
  dispatch(fetchTaskListStart());
  try {
    const { documents } = await filterTaskList(user.$id, filters, sorting);
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

// Update a task status
export const updateTaskStatusAsync = async (taskId, status) => {
  try {
    const task = await updateTaskStatus(taskId, status);
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

//////////////////////////////////////////////////////////////////////////
// List

//Create List
export const createNewList = async (userId, name) => {
  try {
    const list = await createList(userId, name);
    console.log(list);
  } catch (error) {
    console.log(error);
  }
};

const fetchUserListStart = () => ({ type: TASKS_TYPES.FETCH_USER_LISTS_START });

const fetchUserListSuccess = (list) => ({
  type: TASKS_TYPES.FETCH_USER_LISTS_SUCCESS,
  payload: list,
});

const fetchUserListFailed = (errorMessage) => ({
  type: TASKS_TYPES.FETCH_USER_LISTS_FAILED,
  payload: errorMessage,
});

export const fetchUserListAsync = (userid) => async (dispatch) => {
  dispatch(fetchUserListStart());
  try {
    const { documents } = await getUserLists(userid);
    dispatch(fetchUserListSuccess(documents));
  } catch (error) {
    dispatch(fetchUserListFailed(error.message));
  }
};

/////////////////////////////////////////////////////////////////////
// Sort tasks

export const sortTasks = (sortingValues, taskList) => {
  let sortedTaskList = [...taskList];
  const values = [...sortingValues];

  for (let i = 0; i < values.length; i++) {
    const key = values[i][0];
    if (key === "status") {
      sortedTaskList.sort((a, b) => {
        console.log(a, b);
        return b.status - a.status;
      });
    }
  }

  console.log(sortedTaskList);
};
