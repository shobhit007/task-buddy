import React, { createContext, useMemo, useReducer } from "react";

import { taskReducer } from "./tasks.reducer";

const INITIAL_STATE = {
  taskList: [],
  loading: false,
  errorMessage: "",
  userLists: [],
};

export const TaskContext = createContext({
  ...INITIAL_STATE,
});

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE);
  const { taskList, loading, errorMessage, filters, userLists } = state;

  const lengthOfPendingTasks = useMemo(() => {
    const filteredPendingTasks = taskList.filter(
      (task) => task.status === "pending"
    );
    return filteredPendingTasks.length;
  }, [taskList]);

  const lengthOfCompleteTasks = useMemo(() => {
    const filteredPendingTasks = taskList.filter(
      (task) => task.status === "complete"
    );
    return filteredPendingTasks.length;
  }, [taskList]);

  const lengthOfTotalTasks = useMemo(() => {
    return taskList.length;
  }, [taskList]);

  const value = {
    taskList,
    loading,
    errorMessage,
    dispatch,
    filters,
    userLists,
    lengthOfPendingTasks,
    lengthOfCompleteTasks,
    lengthOfTotalTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
