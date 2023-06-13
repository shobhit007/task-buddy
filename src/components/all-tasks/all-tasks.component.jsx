import { useContext, useEffect } from "react";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";
import { fetchTaskList } from "../../context/tasks/tasks.action";

import TaskList from "../tasks-list/tasks-list.component";
import Header from "../header/header.component";

import { listenChanges } from "../../utils/api/appwrite.api";

function Tasks() {
  const { taskList, dispatch, filteredList, setFilteredList } =
    useContext(TaskContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchTaskList(user)(dispatch);
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenChanges((e) => {
      fetchTaskList({ $id: user.$id })(dispatch);
    });

    return () => unsubscribe();
  }, [user, dispatch]);

  useEffect(() => {
    setFilteredList(taskList);
  }, [taskList, setFilteredList]);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-scroll">
      <Header />
      <div className="pt-4 px-4 pb-16 lg:pb-28 bg-transparent">
        <div className="h-full">
          <TaskList items={filteredList} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
