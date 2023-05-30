import React from "react";
import Task from "../task-items/task-item.component";

function TaskList({ items }) {
  return (
    <div className="grid gap-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-fr">
      {items.map((item) => (
        <Task task={item} key={item.$id} />
      ))}
    </div>
  );
}

export default TaskList;
