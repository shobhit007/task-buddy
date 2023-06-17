import { TASK_TYPES } from "./task.types";

export const createTaskStart = (userid, data) => ({
  type: TASK_TYPES.CREATE_TASK_START,
  payload: { userid, data },
});

export const editTaskStart = (taskId, data) => ({
  type: TASK_TYPES.EDIT_TASK_START,
  payload: { taskId, data },
});

export const deleteTaskStart = (taskId) => ({
  type: TASK_TYPES.DELETE_TASK_START,
  payload: { taskId },
});

export const updateTaskStatusStart = (taskId, status) => ({
  type: TASK_TYPES.UPDATE_TASK_STATUS_START,
  payload: { taskId, status },
});

export const updateTaskPriorityStart = (taskId, priority) => ({
  type: TASK_TYPES.UPDATE_TASK_PRIORITY_START,
  payload: { taskId, priority },
});

export const taskSuccess = () => ({ type: TASK_TYPES.TASK_SUCCESS });

export const taskFailed = (error) => ({
  type: TASK_TYPES.TASK_FAILED,
  payload: error,
});
