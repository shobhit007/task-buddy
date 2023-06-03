import React, { createContext, useReducer } from "react";

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

  const value = {
    taskList,
    loading,
    errorMessage,
    dispatch,
    filters,
    userLists,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
