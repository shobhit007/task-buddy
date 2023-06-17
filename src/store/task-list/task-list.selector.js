import { createSelector } from "reselect";

export const selectTaskList = (state) => state.taskList;

export const lengthOfCompleteTasks = createSelector(
  [selectTaskList],
  (tasks) => tasks.taskList.filter((task) => task.status === "complete").length
);

export const lengthOfPendingTasks = createSelector(
  [selectTaskList],
  (tasks) => tasks.taskList.filter((task) => task.status === "pending").length
);
