import React, { createContext, useContext, useReducer } from "react";

import { getListOfTasks } from "../../utils/api/appwrite.api";

import { taskReducer } from "./tasks.reducer";
import { TASKS_TYPES } from "./tasks.types";

import { UserContext } from "../user.context";

const INITIAL_STATE = {
  taskList: [],
  loading: false,
  errorMessage: "",
};

export const Context = createContext({
  ...INITIAL_STATE,
  fetchTaskList: () => {},
});

export function Provider({ children }) {
  const { user } = useContext(UserContext);
  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  const { taskList, loading, errorMessage } = state;

  const fetchTaskList = async () => {
    if (!user) return;
    try {
      dispatch({ type: TASKS_TYPES.FETCH_TASKS_START });
      const { documents } = await getListOfTasks(user.$id);
      dispatch({ type: TASKS_TYPES.FETCH_TASKS_SUCCESS, payload: documents });
    } catch (error) {
      dispatch({
        type: TASKS_TYPES.FETCH_TASKS_FAILED,
        payload: error.message,
      });
    }
  };

  const value = {
    taskList,
    loading,
    errorMessage,
    fetchTaskList,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
