import React, { createContext, useMemo, useReducer, useState } from "react";

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

  const [filteredList, setFilteredList] = useState([]);

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

  const value = {
    taskList,
    loading,
    errorMessage,
    dispatch,
    filters,
    userLists,
    lengthOfPendingTasks,
    lengthOfCompleteTasks,
    setFilteredList,
    filteredList,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
