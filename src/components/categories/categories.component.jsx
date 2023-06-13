import { useContext, useEffect } from "react";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";
import { fetchTaskListByName } from "../../context/tasks/tasks.action";

import TaskList from "../tasks-list/tasks-list.component";
import Header from "../header/header.component";
import { useLocation } from "react-router-dom";

import { listenChanges } from "../../utils/api/appwrite.api";

function Categories() {
  const { taskList, dispatch, filteredList, setFilteredList } =
    useContext(TaskContext);
  const { user } = useContext(UserContext);
  const {
    state: { list_id },
  } = useLocation();

  useEffect(() => {
    fetchTaskListByName(user, list_id)(dispatch);
  }, [user, dispatch, list_id]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenChanges((e) => {
      console.log(e);
      fetchTaskListByName({ $id: user.$id }, list_id)(dispatch);
    });

    return () => unsubscribe();
  }, [dispatch, list_id, user]);

  useEffect(() => {
    setFilteredList(taskList);
  }, [taskList, setFilteredList]);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-scroll">
      <Header list_id={list_id} />
      <div className="pt-4 px-4 pb-16 lg:pb-28 bg-transparent">
        <div className="h-full">
          <TaskList items={filteredList} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
