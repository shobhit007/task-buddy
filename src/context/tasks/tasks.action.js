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
  updateTaskPriority,
  searchTask,
  updateList,
  deleteList,
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

// Search task
export const searchTaskAsync = async (userid, searchInput) => {
  try {
    const { documents } = await searchTask(userid, searchInput);
    console.log(documents);
  } catch (error) {
    console.log(error);
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

// Update a task priority
export const updateTaskPriorityAsync = async (taskId, priority) => {
  try {
    const task = await updateTaskPriority(taskId, priority);
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
