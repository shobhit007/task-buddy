import "../../App.css";
import React from "react";
import Task from "../task-items/task-item.component";

function TaskList({ items }) {
  return (
    <div className="grid gap-x-5 gap-y-4 fit-cols">
      {items.map((item) => (
        <Task task={item} key={item.$id} />
      ))}
    </div>
  );
}

export default TaskList;
