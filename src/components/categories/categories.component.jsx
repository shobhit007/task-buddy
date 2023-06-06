import { useContext, useEffect } from "react";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";
import { fetchTaskListByName } from "../../context/tasks/tasks.action";

import TaskList from "../tasks-list/tasks-list.component";
import Navbar from "../navbar/navbar.component";
import { useLocation } from "react-router-dom";

function Categories() {
  const { taskList, dispatch } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const {
    state: { list_id },
  } = useLocation();

  useEffect(() => {
    fetchTaskListByName(user, list_id)(dispatch);
  }, [user, dispatch, list_id]);

  return (
    <div className="h-full w-full overflow-hidden">
      <Navbar list_id={list_id} />
      <div className="pt-4 pb-4 px-4 lg:pb-28 bg-transparent h-full overflow-y-scroll">
        <div className="h-full">
          <TaskList items={taskList} />
        </div>
      </div>
    </div>
  );
}

export default Categories;
