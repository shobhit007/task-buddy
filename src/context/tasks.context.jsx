import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./user.context";

import {
  getCompletedTasks,
  getPendingTasks,
  completeTask,
  deleteTask,
  updateTask,
  getListOfTasks,
  tasksAscByDate,
  tasksDescByDate,
} from "../utils/api/appwrite.api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [taskList, setTaskList] = useState([]);

  const getPendingTasksList = async () => {
    if (!user) return;
    try {
      const { documents } = await getPendingTasks(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedTasksList = async () => {
    if (!user) return;
    try {
      const { documents } = await getCompletedTasks(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  //get all tasks
  const getAllTasks = async () => {
    if (!user) return;
    try {
      const { documents } = await getListOfTasks(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  // update task to completed
  const taskCompleted = async (id) => {
    try {
      const task = await completeTask(id);
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };

  // delete a task
  const taskDeleted = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  };

  // update a task
  const taskUpdated = async (id, data) => {
    try {
      const item = await updateTask(id, data);
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };

  // get list in asc order by date
  const getAscListByDate = async () => {
    if (!user) return;
    try {
      const { documents } = await tasksAscByDate(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  // get list in asc order by date
  const getDescListByDate = async () => {
    if (!user) return;
    try {
      const { documents } = await tasksDescByDate(user.$id);
      setTaskList(documents);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    taskList,
    getPendingTasksList,
    getCompletedTasksList,
    taskCompleted,
    taskDeleted,
    taskUpdated,
    getAllTasks,
    getAscListByDate,
    getDescListByDate,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
