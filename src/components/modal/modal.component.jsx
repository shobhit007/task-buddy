import React, { useState } from "react";

import {
  SelectContent,
  Select,
  SelectTrigger,
} from "../select/select.component";
import Tooltip from "../tooltip/tooltip.component";

import { StepForward, Ban, Trash2, FlagIcon } from "lucide-react";
import { useDispatch } from "react-redux";

import {
  deleteTaskStart,
  editTaskStart,
  updateTaskStatusStart,
  updateTaskPriorityStart,
} from "../../store/task/task.action";

import { deleteLineUpStart } from "../../store/lineups/lineups.actions";

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

const priorities = {
  3: "Urgent",
  2: "High",
  1: "Normal",
  0: "Low",
};

function Modal({ task, onCloseModal }) {
  const {
    title,
    description,
    status,
    $createdAt,
    $id,
    priority,
    list_name,
    lineupId,
  } = task;

  const [state, setState] = useState({
    title: title,
    description: description,
  });

  const [taskPriority, setTaskPriority] = useState(priority);

  const dispatch = useDispatch();

  const date = new Date($createdAt).toLocaleDateString();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleDeleteTask = () => {
    if (lineupId) {
      console.log(lineupId);
      dispatch(deleteLineUpStart(lineupId));
    }
    dispatch(deleteTaskStart($id));
    onCloseModal();
  };

  const handleUpdateTask = () => {
    if (!state.title || !state.description) {
      console.log("fields are required");
      return;
    }

    const data = {
      title: state.title,
      description: state.description,
    };
    dispatch(editTaskStart($id, data));

    onCloseModal();
  };

  const handleUpdateTaskStatus = () =>
    dispatch(
      updateTaskStatusStart($id, status === "complete" ? "pending" : "complete")
    );

  const handlePriority = (priorityKey, callback) => {
    setTaskPriority(priorityKey);
    if (priority !== priorityKey) {
      dispatch(updateTaskPriorityStart($id, priorityKey));
    }
    callback();
  };

  return (
    <div className="fixed inset-0 w-full h-full z-100">
      <div className="py-8 md:py-14 xl:py-20 px-2 lg:px-0 relative h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
        <div className="max-w-screen-md my-0 mx-auto bg-white rounded-lg overflow-hidden shadow-0 relative">
          <div className="flex items-center justify-between py-2 px-3 lg:p-4 bg-slate-200">
            <p className="text-base font-medium text-black">{list_name}</p>
            <button
              className="group px-3 py-[3px] rounded bg-white"
              onClick={onCloseModal}
            >
              <span className="material-symbols-outlined text-xl font-semibold text-gray-400 group-hover:rotate-90 group-hover:text-blue-400 transition-all duration-300">
                close
              </span>
            </button>
          </div>
          <div className="flex justify-between items-center py-2 md:py-4 px-2 md:px-8 border-b border-gray-100">
            <div className="flex gap-2">
              <div
                className={`flex gap-2 p-2 rounded ${
                  status === "complete" ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <span className="text-sm font-medium text-white">{status}</span>
                <Tooltip
                  offsetY={16}
                  content={`Next status [${
                    status === "complete" ? "Pending" : "Complete"
                  }]`}
                >
                  <button
                    className="group/button p-0.5 border-l"
                    onClick={handleUpdateTaskStatus}
                  >
                    <StepForward size={16} className="text-white" />
                  </button>
                </Tooltip>
              </div>
              <Select>
                <SelectTrigger>
                  <Tooltip
                    content={
                      priorities[taskPriority]
                        ? `Priority ${priorities[taskPriority]}`
                        : "Select priority"
                    }
                  >
                    <button
                      className={`group/button w-10 h-10 rounded-[50%] flex items-center justify-center ml-2 border border-[${priorityColors[taskPriority]}]`}
                    >
                      <FlagIcon
                        size={14}
                        fill={priorityColors[taskPriority] || "transparent"}
                        color={priorityColors[taskPriority]}
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
                  size={16}
                  className="text-gray-400 group-hover/button:text-red-600"
                />
              </button>
            </Tooltip>
          </div>
          <div className="px-2 sm:px-10">
            <div className="border-b border-b-gray-200 py-3 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 inline-block uppercase">
                Created: <span className="text-sm ml-0.5">{date}</span>
              </span>
              <div className="flex gap-3"></div>
            </div>
            <div className="py-3">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={state.title}
                onChange={handleOnChange}
                className="p-3 w-full focus:outline-none border border-transparent rounded hover:border-gray-300 focus:border-gray-300"
              />
              <textarea
                placeholder="Description"
                rows={3}
                name="description"
                value={state.description}
                onChange={handleOnChange}
                className="w-full focus:outline-none p-3 mt-3 border border-transparent rounded hover:border-gray-300 focus:border-gray-300"
              />
            </div>
          </div>
          <button
            onClick={handleUpdateTask}
            className="absolute right-0 bottom-0 bg-blue-600 text-white font-normal text-sm py-2 px-3 rounded-tl-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
