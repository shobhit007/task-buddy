import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./user.context";

import { getCompletedTasks, getPendingTasks } from "../utils/api/appwrite.api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [taskList, setTaskList] = useState([]);

  const getPendingTasksList = async () => {
    try {
      const { documents } = await getPendingTasks(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedTasksList = async () => {
    try {
      const { documents } = await getCompletedTasks(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    taskList,
    getPendingTasksList,
    getCompletedTasksList,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
