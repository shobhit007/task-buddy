import React, { Fragment, useReducer, useState } from "react";

import {
  Ban,
  Check,
  FlagIcon,
  Pencil,
  StepForward,
  Trash2,
} from "lucide-react";

import {
  completeTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
  updateTaskPriorityAsync,
} from "../../context/tasks/tasks.action";

import Tooltip from "../tooltip/tooltip.component";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

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
  const { title, priority, description, status, $createdAt, $id, list_name } =
    task;
  const [showEdit, setShowEdit] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    title,
    description,
    priority,
  });

  const date = new Date($createdAt).toLocaleDateString();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT_VALUE", payload: { name, value } });
  };

  const handlePriority = (key, callback) => {
    dispatch({ type: "SET_PRIORITY", payload: key });

    if (priority !== key) {
      updateTaskPriorityAsync($id, key);
    }
    callback();
  };

  const handleCompleteTask = () => completeTaskAsync($id);

  const handleDeleteTask = () => deleteTaskAsync($id);

  const handleUpdateTask = () => {
    if (!state.title || !state.description) {
      console.log("fields are required");
      return;
    }

    const data = {
      title: state.title,
      description: state.description,
      priority: parseInt(state.priority),
    };
    updateTaskAsync($id, data);
    setShowEdit(false);
  };

  const handleUpdateTaskStatus = () =>
    updateTaskStatusAsync($id, status === "complete" ? "pending" : "complete");

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
        <div className="fixed inset-0 w-full h-full z-10">
          <div className="py-20 relative h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="max-w-screen-md my-0 mx-auto bg-white rounded-lg overflow-hidden shadow-0 relative">
              <div className="flex items-center justify-between p-4 bg-slate-200">
                <p className="text-base font-medium text-black">{list_name}</p>
                <button
                  className="group px-3 py-[3px] rounded bg-white"
                  onClick={() => setShowEdit(false)}
                >
                  <span className="material-symbols-outlined text-xl font-semibold text-gray-400 group-hover:rotate-90 group-hover:text-blue-400 transition-all duration-300">
                    close
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-center py-4 px-8 border-b border-gray-100">
                <div className="flex gap-2">
                  <div
                    className={`flex gap-2 p-2 rounded ${
                      status === "complete" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    <span className="text-sm font-medium text-white">
                      {status}
                    </span>
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
                          priorities[state.priority]
                            ? `Priority ${priorities[state.priority]}`
                            : "Select priority"
                        }
                      >
                        <button
                          className={`group/button w-10 h-10 rounded-[50%] flex items-center justify-center ml-2 border border-[${
                            priorityColors[state.priority]
                          }]`}
                        >
                          <FlagIcon
                            size={14}
                            fill={
                              priorityColors[state.priority] || "transparent"
                            }
                            color={priorityColors[state.priority]}
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
              <div className="px-10">
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
      )}
    </Fragment>
  );
}

export default Task;
