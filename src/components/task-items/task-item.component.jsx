import React from "react";

function Task({ task }) {
  const { title, description } = task;
  return (
    <div className="bg-white p-4">
      <h2 className="text-black font-semibold">{title}</h2>
      <p className="text-black font-normal">{description}</p>
    </div>
  );
}

export default Task;
