import React, { Fragment, useState } from "react";

import {
  Ban,
  Check,
  FlagIcon,
  Pencil,
  StepForward,
  Trash2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../popover/popover.component";

import {
  // completeTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
  updateTaskStatusAsync,
} from "../../context/tasks/tasks.action";
import {
  DropDownContent,
  DropDownFooter,
  DropDownItem,
} from "../dropdown/dropdown.component";
import Portal from "../portal/portal.component";
import { Overlay, OverlayHandler } from "../overlay/overlay.component";
import { useFloating, autoUpdate } from "@floating-ui/react";

const priorityColors = {
  3: "#ef4444",
  2: "#facc15",
  1: "#3b82f6",
  0: "#6b7280",
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

  // Floating UI
  const [anchorEl1, setAnchorEl1] = useState();
  const [anchorEl2, setAnchorEl2] = useState();
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    elements: { reference: showEdit ? anchorEl2 : anchorEl1 },
  });

  const date = new Date($createdAt).toLocaleDateString();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormFields((preValues) => ({ ...preValues, [name]: value }));

    if (name === "priority") setShowOptions(false);
  };

  // const handleCompleteTask = () => completeTaskAsync($id);

  const handleDeleteTask = () => deleteTaskAsync($id);

  const handleUpdateTask = () => {
    if (!formFields.title || !formFields.description) {
      console.log("fields are required");
      return;
    }

    const data = {
      title: formFields.title,
      description: formFields.description,
      priority: parseInt(formFields.priority),
    };
    updateTaskAsync($id, data);
    setShowEdit(false);
  };

  const handleUpdateTaskStatus = () =>
    updateTaskStatusAsync($id, status === "complete" ? "pending" : "complete");

  return (
    <Fragment>
      <div
        aria-expanded={showOptions ? "true" : "false"}
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
              <Tooltip>
                <TooltipTrigger>
                  <button className="group/button">
                    <Check
                      size={15}
                      className="group-hover/button:text-green-600 material-symbols-outlined font-bold text-gray-500"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Complete task</TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger>
                <button
                  className="relative group/button"
                  onClick={() => setShowEdit(true)}
                >
                  <Pencil
                    size={14}
                    className="group-hover/button:text-blue-600 material-symbols-outlined font-medium text-gray-500"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => setShowOptions((p) => !p)}
                  className="relative group/button"
                  ref={setAnchorEl1}
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
                </button>
              </TooltipTrigger>
              <TooltipContent>Set priority</TooltipContent>
            </Tooltip>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <button
                className="relative group/button"
                onClick={handleDeleteTask}
              >
                <Trash2
                  size={14}
                  className="group-hover/button:text-red-600 material-symbols-outlined text-base font-medium text-gray-500"
                >
                  delete
                </Trash2>
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
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
                      {/* <Popover y="6">{`Next status [${
                        status === "complete" ? "pending" : "complete"
                      }]`}</Popover> */}
                    </button>
                  </div>
                  <div className="relative" ref={setAnchorEl2}>
                    <button
                      onClick={() => setShowOptions((p) => !p)}
                      className="group/button w-10 h-10 rounded-[50%] border-2 border-dashed flex items-center justify-center ml-2"
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
                      {/* <Popover y="2">Set priority</Popover> */}
                    </button>
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
                  {/* <Popover y="6">Delete</Popover> */}
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

      <Portal>
        <Overlay open={showOptions}>
          <OverlayHandler
            onClose={() => setShowOptions(false)}
          ></OverlayHandler>
          <div
            className="absolute z-[1000]"
            ref={refs.setFloating}
            style={floatingStyles}
          >
            <DropDownContent>
              <DropDownItem>
                <button className="w-full p-2 flex items-center rounded hover:bg-gray-200">
                  <FlagIcon
                    size={14}
                    fill="#ef4444"
                    className="mr-2 text-red-500"
                  />
                  <span className="text-sm text-gray-800">Urgent</span>
                </button>
              </DropDownItem>
              <DropDownItem>
                <button className="w-full p-2 flex items-center rounded hover:bg-gray-200">
                  <FlagIcon
                    size={14}
                    fill="#facc15"
                    className="mr-2 text-yellow-400"
                  />
                  <span className="text-sm text-gray-800">High</span>
                </button>
              </DropDownItem>
              <DropDownItem>
                <button className="w-full p-2 flex items-center rounded hover:bg-gray-200">
                  <FlagIcon
                    size={14}
                    fill="#3b82f6"
                    className="mr-2 text-blue-500"
                  />
                  <span className="text-sm text-gray-800">Normal</span>
                </button>
              </DropDownItem>
              <DropDownItem>
                <button className="w-full p-2 flex items-center rounded hover:bg-gray-200">
                  <FlagIcon
                    size={14}
                    fill="#6b7280"
                    className="mr-2 text-gray-500"
                  />
                  <span className="text-sm text-gray-800">Low</span>
                </button>
              </DropDownItem>
              <DropDownFooter>
                <DropDownItem>
                  <button className="w-full p-2 flex items-center rounded hover:bg-gray-200">
                    <Ban size={14} className="mr-2 text-gray-500" />
                    <span className="text-sm text-gray-800">Low</span>
                  </button>
                </DropDownItem>
              </DropDownFooter>
            </DropDownContent>
          </div>
        </Overlay>
      </Portal>
    </Fragment>
  );
}

export default Task;
