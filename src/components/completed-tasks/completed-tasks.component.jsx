import React, { useContext, useEffect } from "react";
import { TaskContext } from "../../context/tasks.context";
import TaskList from "../tasks-list/tasks-list.component";

function CompltedTasks() {
  const { taskList, getCompletedTasksList } = useContext(TaskContext);

  useEffect(() => {
    getCompletedTasksList();
  }, [getCompletedTasksList]);

  return (
    <div className="w-full p-8">
      <TaskList items={taskList} />
    </div>
  );
}

export default CompltedTasks;
