import { TASKS_TYPES } from "./tasks.types";

import {
  getListOfTasks,
  createNewTask,
  completeTask,
  deleteTask,
  updateTask,
  filterTaskList,
  createList,
  getUserLists,
  getListOfTasksByName,
  updateTaskStatus,
  updateTaskPriority,
  updateList,
  deleteList,
  createLineup,
  lineups,
  deleteLineUp,
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
    await createNewTask(user.$id, data);
  } catch (error) {
    console.log(error);
  }
};

// Update a task priority
export const updateTaskPriorityAsync = async (taskId, priority) => {
  try {
    await updateTaskPriority(taskId, priority);
  } catch (error) {
    console.log(error);
  }
};

// Update a task status
export const updateTaskStatusAsync = async (taskId, status) => {
  try {
    await updateTaskStatus(taskId, status);
  } catch (error) {
    console.log(error);
  }
};

// Update status by complete a task
export const completeTaskAsync = async (taskId) => {
  try {
    await completeTask(taskId);
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
    await updateTask(taskId, data);
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////////////////////////////////////////
// List

//Create list
export const createNewList = async (userId, name) => {
  try {
    await createList(userId, name);
  } catch (error) {
    console.log(error);
  }
};

// Update list
export const updateListAsync = async (listId, data) => {
  try {
    await updateList(listId, data);
  } catch (error) {
    console.log(error);
  }
};

// Delete list
export const deleteListAsync = async (listId) => {
  try {
    await deleteList(listId);
  } catch (error) {
    console.log(error);
  }
};

// Fetch all lists start
const fetchUserListStart = () => ({ type: TASKS_TYPES.FETCH_USER_LISTS_START });

const fetchUserListSuccess = (list) => ({
  type: TASKS_TYPES.FETCH_USER_LISTS_SUCCESS,
  payload: list,
});

const fetchUserListFailed = (errorMessage) => ({
  type: TASKS_TYPES.FETCH_USER_LISTS_FAILED,
  payload: errorMessage,
});

// Fetch all lists end
export const fetchUserListAsync = (userid) => async (dispatch) => {
  dispatch(fetchUserListStart());
  try {
    const { documents } = await getUserLists(userid);
    dispatch(fetchUserListSuccess(documents));
  } catch (error) {
    dispatch(fetchUserListFailed(error.message));
  }
};

// Lineup
/////////////////////////////////////////////////////

export const createLineupAsync = async (userid, taskid) => {
  try {
    await createLineup(userid, taskid);
  } catch (error) {
    console.log(error);
  }
};

export const getLineUpsAsync = async (userid) => {
  try {
    const { documents } = await lineups(userid);
    return documents;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLineUpAsync = async (lineupId) => {
  try {
    await deleteLineUp(lineupId);
  } catch (error) {
    console.log(error);
  }
};
