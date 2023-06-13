import React, { Fragment, useReducer, useState } from "react";

import { Ban, Check, FlagIcon, Pencil, Trash2 } from "lucide-react";

import {
  completeTaskAsync,
  deleteTaskAsync,
  updateTaskPriorityAsync,
} from "../../context/tasks/tasks.action";

import Tooltip from "../tooltip/tooltip.component";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import Modal from "../modal/modal.component";

const priorityColors = {
  3: "#ef4444",
  2: "#facc15",
  1: "#3b82f6",
  0: "#6b7280",
};

const options = [
  {
    key: 3,
    value: "Urgent",
  },
  {
    key: 2,
    value: "High",
  },
  {
    key: 1,
    value: "Normal",
  },
  {
    key: 0,
    value: "Low",
  },
];

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_INPUT_VALUE":
      return { ...state, [payload.name]: payload.value };
    case "SET_PRIORITY":
      return { ...state, priority: payload };
    default:
      return state;
  }
};

function Task({ task }) {
  const { title, priority, status, $createdAt, $id, list_name } = task;
  const [showEdit, setShowEdit] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    priority,
  });

  const date = new Date($createdAt).toLocaleDateString();

  const handlePriority = (key, callback) => {
    dispatch({ type: "SET_PRIORITY", payload: key });

    if (priority !== key) {
      updateTaskPriorityAsync($id, key);
    }
    callback();
  };

  const handleCompleteTask = () => completeTaskAsync($id);

  const handleDeleteTask = () => deleteTaskAsync($id);

  return (
    <Fragment>
      <div
        aria-expanded={"false"}
        className={`group bg-white p-3 rounded shadow hover:shadow-md hover:shadow-gray-300 h-max border-t-2 ${
          status === "pending" ? "border-gray-300" : "border-green-300"
        }`}
      >
        <div className="pb-2 cursor-pointer">
          <span className="text-sm font-medium text-gray-400 block">
            {list_name}
          </span>
          <span className="text-[11px] text-medium text-gray-400 block">
            Created at: {date}
          </span>
          <h1 className="text-base text-black font-normal mt-0.5">{title}</h1>
        </div>
        <div className="flex justify-between border-t border-gray-100 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:h-max group-aria-[expanded=true]:opacity-100 group-aria-[expanded=true]:visible group-aria-[expanded=true]:h-max">
          <div className="flex gap-x-2 items-center">
            {status !== "complete" && (
              <Tooltip content="Complete task">
                <button className="group/button" onClick={handleCompleteTask}>
                  <Check
                    size={15}
                    className="group-hover/button:text-green-600 material-symbols-outlined font-bold text-gray-500"
                  />
                </button>
              </Tooltip>
            )}
            <Tooltip content="Edit">
              <button
                className="group/button"
                onClick={() => setShowEdit(true)}
              >
                <Pencil
                  size={14}
                  className="group-hover/button:text-blue-600 material-symbols-outlined font-medium text-gray-500"
                />
              </button>
            </Tooltip>

            <Select>
              <SelectTrigger>
                <Tooltip content="Priority">
                  <button className="group/button h-full">
                    <FlagIcon
                      size={14}
                      fill={
                        priorityColors[state.priority]
                          ? priorityColors[state.priority]
                          : "transparent"
                      }
                      className={`text-gray-500 font-medium group-hover/button:text-${
                        priorityColors[state.priority]
                      }`}
                    />
                  </button>
                </Tooltip>
              </SelectTrigger>
              <SelectContent
                renderItem={(onClose) => (
                  <div className="p-2">
                    {options.map(({ key, value }) => (
                      <button
                        key={key}
                        className="block w-full flex items-center justify-start p-2 rounded hover:bg-slate-200 text-sm"
                        onClick={() => handlePriority(key, onClose)}
                      >
                        <FlagIcon
                          size={14}
                          fill={priorityColors[key]}
                          color={priorityColors[key]}
                          className="mr-2"
                        />
                        {value}
                      </button>
                    ))}
                    <div className="mt-2 pt-0.5 border-t border-gray-100">
                      <button
                        onClick={() => handlePriority(-1, onClose)}
                        className="block w-full flex items-center justify-start p-2 rounded hover:bg-slate-200 text-sm mt-0.5"
                      >
                        <Ban size={14} className="text-gray-500 mr-2" />
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              />
            </Select>
          </div>

          <Tooltip content="Delete">
            <button className="group/button" onClick={handleDeleteTask}>
              <Trash2
                size={14}
                className="group-hover/button:text-red-600 material-symbols-outlined text-base font-medium text-gray-500"
              />
            </button>
          </Tooltip>
        </div>
      </div>
      {/* Edit Modal */}
      {showEdit && (
        <Modal
          task={task}
          onCloseModal={() => setShowEdit(false)}
          onHandlePriority={handlePriority}
          priority={priority}
        />
      )}
    </Fragment>
  );
}

export default Task;
