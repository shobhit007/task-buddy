import React, { createContext, useReducer } from "react";

import { taskReducer } from "./tasks.reducer";

const INITIAL_STATE = {
  taskList: [],
  loading: false,
  errorMessage: "",
};

export const TaskContext = createContext({
  ...INITIAL_STATE,
  fetchTaskList: () => {},
});

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  const { taskList, loading, errorMessage, filters } = state;

  const value = {
    taskList,
    loading,
    errorMessage,
    dispatch,
    filters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
