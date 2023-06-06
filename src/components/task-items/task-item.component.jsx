import React, { Fragment, useState } from "react";

import {
  Ban,
  Check,
  FlagIcon,
  Pencil,
  StepForward,
  Trash2,
} from "lucide-react";

import Popover from "../popover/popover.component";

import {
  completeTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
} from "../../context/tasks/tasks.action";

const priorityColors = {
  3: "#dc2626",
  2: "#facc15",
  1: "#38bdf8",
  0: "#a3a3a3",
};

function Task({ task }) {
  const { title, priority, description, status, $createdAt, $id, list_name } =
    task;
  const [showEdit, setShowEdit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [formFields, setFormFields] = useState({
    title,
    description,
    priority,
  });

  const date = new Date($createdAt).toLocaleDateString();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormFields((preValues) => ({ ...preValues, [name]: value }));

    if (name === "priority") setShowOptions(false);
  };

  const handleCompleteTask = () => completeTaskAsync($id);

  const handleDeleteTask = () => deleteTaskAsync($id);

  const handleUpdateTask = () => {
    if (!formFields.title || !formFields.description) {
      console.log("fields are required");
      return;
    }

    const data = {
      title: formFields.title,
      description: formFields.description,
      priority: parseFloat(formFields.priority),
    };
    updateTaskAsync($id, data);
    setShowEdit(false);
  };

  const handleUpdateTaskStatus = () =>
    updateTaskStatusAsync($id, status === "complete" ? "pending" : "complete");

  return (
    <Fragment>
      <div
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
        <div className="flex justify-between border-t border-gray-100 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:h-max">
          <div className="flex gap-x-2 items-center">
            {status !== "complete" && (
              <button
                className="relative group/button"
                onClick={handleCompleteTask}
              >
                <Check
                  size={15}
                  className="group-hover/button:text-green-600 material-symbols-outlined font-bold text-gray-500"
                >
                  check
                </Check>
                <Popover>Complete task</Popover>
              </button>
            )}
            <button
              className="relative group/button"
              onClick={() => setShowEdit(true)}
            >
              <Pencil
                size={14}
                className="group-hover/button:text-blue-600 material-symbols-outlined font-medium text-gray-500"
              >
                edit
              </Pencil>
              <Popover>Edit</Popover>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowOptions((p) => !p)}
                className="group/button"
              >
                <FlagIcon
                  size={14}
                  fill={
                    priorityColors[formFields.priority]
                      ? priorityColors[formFields.priority]
                      : "transparent"
                  }
                  className={`text-gray-500 font-medium group-hover/button:text-blue-600`}
                />
                <Popover>Set priority</Popover>
              </button>
              {showOptions && (
                <div className="absolute top-full translate-y-2 left-1/2 -translate-x-1/2 w-max z-[10]">
                  <div className="p-2 bg-white border border-gray-200 rounded shadow-xl shadow-gray-300">
                    <label htmlFor="urgent" className="block relative w-full">
                      <input
                        id="urgent"
                        type="radio"
                        name="priority"
                        className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                        value="urgent"
                        onChange={handleOnChange}
                      />
                      <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                        <FlagIcon
                          size={14}
                          color="#dc2626"
                          fill="#dc2626"
                          className="mr-2"
                        />
                        urgent
                      </span>
                    </label>
                    <label htmlFor="high" className="block relative w-full">
                      <input
                        id="high"
                        type="radio"
                        name="priority"
                        className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                        value="high"
                        onChange={handleOnChange}
                      />
                      <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                        <FlagIcon
                          size={14}
                          color="#facc15"
                          fill="#facc15"
                          className="mr-2"
                        />
                        High
                      </span>
                    </label>
                    <label htmlFor="normal" className="block relative w-full">
                      <input
                        id="normal"
                        type="radio"
                        name="priority"
                        className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                        value="normal"
                        onChange={handleOnChange}
                      />
                      <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                        <FlagIcon
                          size={14}
                          color="#38bdf8"
                          fill="#38bdf8"
                          className="mr-2"
                        />
                        Normal
                      </span>
                    </label>
                    <label htmlFor="low" className="block relative w-full">
                      <input
                        id="low"
                        type="radio"
                        name="priority"
                        className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                        value="low"
                        onChange={handleOnChange}
                      />
                      <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                        <FlagIcon
                          size={14}
                          color="#a3a3a3"
                          fill="#a3a3a3"
                          className="mr-2"
                        />
                        Low
                      </span>
                    </label>
                    <div className="py-2 border-t border-t-gray-200">
                      <label htmlFor="no" className="block relative w-full">
                        <input
                          id="no"
                          type="radio"
                          name="priority"
                          className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                          value="no"
                          onChange={handleOnChange}
                        />
                        <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                          <Ban size={14} color="#a3a3a3" className="mr-2" />
                          Clear
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="relative group/button" onClick={handleDeleteTask}>
            <Trash2
              size={14}
              className="group-hover/button:text-red-600 material-symbols-outlined text-base font-medium text-gray-500"
            >
              delete
            </Trash2>
            <Popover>Delete</Popover>
          </button>
        </div>
      </div>
      {/* overlay */}
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
                    <button
                      className="relative group/button p-0.5 border-l"
                      onClick={handleUpdateTaskStatus}
                    >
                      <StepForward size={16} className="text-white" />
                      <Popover y="6">{`Next status [${
                        status === "complete" ? "pending" : "complete"
                      }]`}</Popover>
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowOptions((p) => !p)}
                      className="relative group/button w-10 h-10 rounded-[50%] border-2 border-dashed flex items-center justify-center ml-2"
                    >
                      <FlagIcon
                        size={16}
                        fill={
                          priorityColors[formFields.priority]
                            ? priorityColors[formFields.priority]
                            : "transparent"
                        }
                        className={`text-gray-500 font-medium group-hover/button:text-blue-600`}
                      />
                      <Popover y="2">Set priority</Popover>
                    </button>
                    {showOptions && (
                      <div className="absolute top-full translate-y-2 left-1/2 -translate-x-1/2 w-max z-[10]">
                        <div className="p-2 bg-white border border-gray-200 rounded shadow-xl shadow-gray-300">
                          <label
                            htmlFor="urgent"
                            className="block relative w-full"
                          >
                            <input
                              id="urgent"
                              type="radio"
                              name="priority"
                              className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                              value="3"
                              onChange={handleOnChange}
                            />
                            <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                              <FlagIcon
                                size={14}
                                color="#dc2626"
                                fill="#dc2626"
                                className="mr-2"
                              />
                              urgent
                            </span>
                          </label>
                          <label
                            htmlFor="high"
                            className="block relative w-full"
                          >
                            <input
                              id="high"
                              type="radio"
                              name="priority"
                              className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                              value="2"
                              onChange={handleOnChange}
                            />
                            <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                              <FlagIcon
                                size={14}
                                color="#facc15"
                                fill="#facc15"
                                className="mr-2"
                              />
                              High
                            </span>
                          </label>
                          <label
                            htmlFor="normal"
                            className="block relative w-full"
                          >
                            <input
                              id="normal"
                              type="radio"
                              name="priority"
                              className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                              value="1"
                              onChange={handleOnChange}
                            />
                            <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                              <FlagIcon
                                size={14}
                                color="#38bdf8"
                                fill="#38bdf8"
                                className="mr-2"
                              />
                              Normal
                            </span>
                          </label>
                          <label
                            htmlFor="low"
                            className="block relative w-full"
                          >
                            <input
                              id="low"
                              type="radio"
                              name="priority"
                              className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                              value="0"
                              onChange={handleOnChange}
                            />
                            <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                              <FlagIcon
                                size={14}
                                color="#a3a3a3"
                                fill="#a3a3a3"
                                className="mr-2"
                              />
                              Low
                            </span>
                          </label>
                          <div className="py-2 border-t border-t-gray-200">
                            <label
                              htmlFor="no"
                              className="block relative w-full"
                            >
                              <input
                                id="no"
                                type="radio"
                                name="priority"
                                className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                                value="-1"
                                onChange={handleOnChange}
                              />
                              <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
                                <Ban
                                  size={14}
                                  color="#a3a3a3"
                                  className="mr-2"
                                />
                                Clear
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="relative group/button"
                  onClick={handleDeleteTask}
                >
                  <Trash2
                    size={16}
                    className="text-gray-400 group-hover/button:text-red-600"
                  />
                  <Popover y="6">Delete</Popover>
                </button>
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
                    value={formFields.title}
                    onChange={handleOnChange}
                    className="p-3 w-full focus:outline-none border border-transparent rounded hover:border-gray-300 focus:border-gray-300"
                  />
                  <textarea
                    placeholder="Description"
                    rows={3}
                    name="description"
                    value={formFields.description}
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
