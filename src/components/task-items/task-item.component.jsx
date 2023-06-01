import React, { Fragment, useState } from "react";

// import {TaskContext} from "../../context/tasks/tasks.context";

import Input from "../input/input.component";
import Button from "../button/button";

import {
  completeTaskAsync,
  deleteTaskAsync,
  updateTaskAsync,
} from "../../context/tasks/tasks.action";

const priorities = {
  urgent: "bg-red-400",
  high: "bg-purple-400",
  medium: "bg-green-400",
  low: "bg-yellow-400",
};

function Task({ task }) {
  const { title, description, $id, completed, priority, $createdAt } = task;
  const date = new Date($createdAt);
  // const { dispatch} = useContext(TaskContext);

  const [taskFields, setTaskFields] = useState({
    inputTitle: title,
    inputDescription: description,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);

  const { inputDescription, inputTitle } = taskFields;

  const handleOnChangeFields = (e) => {
    const { name, value } = e.target;
    setTaskFields((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleEdit = () => {
    setIsEdit(true);
    setMoreOptions(false);
  };

  const handleTaskCompleted = () => completeTaskAsync($id);

  const handleTaskDeleted = () => deleteTaskAsync($id);

  const handleTaskUpdated = () => {
    if (!inputDescription || !inputTitle) {
      console.log("fields are required.");
    }

    const data = { title: inputTitle, description: inputDescription };
    updateTaskAsync($id, data);
  };

  return (
    <div className="bg-white p-4 rounded">
      {!isEdit ? (
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-2">
            <span
              className={`inline-block w-3 h-8 rounded ${priorities[priority]}`}
            ></span>
            <h2 className="text-black font-semibold">{title}</h2>
          </div>
          <div className="relative">
            <button className="p-2" onClick={() => setMoreOptions((p) => !p)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
            {moreOptions && (
              <div className="absolute top-6 right-0 bg-white z-[2]">
                {!completed && (
                  <button
                    onClick={handleTaskCompleted}
                    className="w-full px-1 py-2 flex justify-start text-sm font-medium hover:bg-green-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Complete
                  </button>
                )}
                {!completed && (
                  <button
                    onClick={handleEdit}
                    className="w-full px-1 py-2 flex justify-start text-sm font-medium hover:bg-yellow-500 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                )}
                <button
                  onClick={handleTaskDeleted}
                  className="w-full px-1 py-2 flex justify-start text-sm font-medium hover:bg-red-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="flex justify-end">
            <button className="p-2" onClick={() => setIsEdit(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Input
            type="text"
            value={inputTitle}
            name="inputTitle"
            onChange={handleOnChangeFields}
          />
        </Fragment>
      )}

      {!isEdit && (
        <p className="text-sm font-semibold text-gray-400">
          {date.toLocaleDateString()}
        </p>
      )}

      {!isEdit ? (
        <p className="text-black font-normal">{description}</p>
      ) : (
        <textarea
          value={inputDescription}
          name="inputDescription"
          onChange={handleOnChangeFields}
          className="w-full"
          rows={6}
        />
      )}
      {isEdit && (
        <Button style={{ marginTop: "0.5rem" }} onClick={handleTaskUpdated}>
          Update
        </Button>
      )}
    </div>
  );
}

export default Task;
