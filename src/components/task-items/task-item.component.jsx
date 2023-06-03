import React, { Fragment, useState } from "react";

import {
  completeTaskAsync,
  deleteTaskAsync,
} from "../../context/tasks/tasks.action";

function Task({ task }) {
  const { title, status, $createdAt, $id } = task;
  const [showEdit, setShowEdit] = useState(false);

  const date = new Date($createdAt).toLocaleDateString();

  const handleCompleteTask = () => completeTaskAsync($id);

  const handleDeleteTask = () => deleteTaskAsync($id);

  return (
    <Fragment>
      <div
        className={`group bg-white p-3 rounded shadow hover:shadow-md hover:shadow-gray-300 h-max border-t-2 ${
          status === "pending" ? "border-gray-300" : "border-green-300"
        }`}
      >
        <div className="pb-2 cursor-pointer">
          <span className="text-sm text-medium text-gray-400 block">
            My List
          </span>
          <span className="text-[11px] text-medium text-gray-400 block">
            Created at: {date}
          </span>
          <h1 className="text-base text-black font-normal mt-0.5">{title}</h1>
        </div>
        <div className="flex justify-between border-t border-gray-100 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:h-max">
          <div className="flex gap-x-2">
            {status !== "complete" && (
              <button
                className="relative group/button"
                onClick={handleCompleteTask}
              >
                <span className="group-hover/button:text-green-600 material-symbols-outlined text-xl font-semibold text-gray-400">
                  check
                </span>
                <span
                  className="absolute -top-full left-1/2
             -translate-x-1/2 z-[1]
              block text-xs text-white
              font-medium rounded bg-gray-700
              w-max px-3 py-2 
              -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
              after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
              after:-translate-x-1/2 after:left-1/2"
                >
                  Complete task
                </span>
              </button>
            )}
            <button
              className="relative group/button"
              onClick={() => setShowEdit(true)}
            >
              <span className="group-hover/button:text-blue-600 material-symbols-outlined text-base font-semibold text-gray-400">
                edit
              </span>
              <span
                className="absolute -top-full left-1/2
             -translate-x-1/2 z-[1]
              block text-xs text-white
              font-medium rounded bg-gray-700
              w-max px-3 py-2 
              -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
              after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
              after:-translate-x-1/2 after:left-1/2"
              >
                Edit
              </span>
            </button>
          </div>
          <button className="relative group/button" onClick={handleDeleteTask}>
            <span className="group-hover/button:text-red-600 material-symbols-outlined text-base font-semibold text-gray-400">
              delete
            </span>
            <span
              className="absolute -top-full left-1/2
             -translate-x-1/2 z-[1]
              block text-xs text-white
              font-medium rounded bg-gray-700
              w-max px-3 py-2 
              -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
              after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
              after:-translate-x-1/2 after:left-1/2"
            >
              Delete
            </span>
          </button>
        </div>
      </div>
      {/* overlay */}
      {showEdit && (
        <div className="fixed inset-0 w-full h-full z-10">
          <div className="py-20 relative h-screen bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="max-w-screen-md my-0 mx-auto bg-white rounded-lg overflow-hidden shadow-0 relative">
              <div className="flex items-center justify-between p-4 bg-slate-200">
                <p className="text-base text-gray-600 font-medium">My List</p>
                <button
                  className="group px-3 py-[3px] rounded bg-white"
                  onClick={() => setShowEdit(false)}
                >
                  <span className="material-symbols-outlined text-xl font-semibold text-gray-400 group-hover:rotate-90 group-hover:text-blue-400 transition-all duration-300">
                    close
                  </span>
                </button>
              </div>
              <div className="px-10 py-8">
                <div className="border-b border-b-gray-200 py-3 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 inline-block uppercase">
                    Created: <span className="text-sm ml-0.5">{date}</span>
                  </span>
                  <div className="flex gap-3">
                    <button
                      className="relative group/button"
                      onClick={handleCompleteTask}
                    >
                      <span className="group-hover/button:text-green-600 material-symbols-outlined text-xl font-semibold text-gray-400">
                        check
                      </span>
                      <span
                        className="absolute -top-full left-1/2
                      -translate-x-1/2 z-[1]
                        block text-xs text-white
                        font-medium rounded bg-gray-700
                        w-max px-3 py-2 
                        -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
                        after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
                        after:-translate-x-1/2 after:left-1/2"
                      >
                        Complete task
                      </span>
                    </button>
                    <button
                      className="relative group/button"
                      onClick={handleCompleteTask}
                    >
                      <span className="group-hover/button:text-blue-400 material-symbols-outlined text-xl font-semibold text-gray-400">
                        label_important
                      </span>
                      <span
                        className="absolute -top-full left-1/2
                      -translate-x-1/2 z-[1]
                        block text-xs text-white
                        font-medium rounded bg-gray-700
                        w-max px-3 py-2 
                        -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
                        after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
                        after:-translate-x-1/2 after:left-1/2"
                      >
                        Set priority
                      </span>
                    </button>
                    <button
                      className="relative group/button"
                      onClick={handleDeleteTask}
                    >
                      <span className="group-hover/button:text-red-600 material-symbols-outlined text-base font-semibold text-gray-400">
                        delete
                      </span>
                      <span
                        className="absolute -top-full left-1/2
                      -translate-x-1/2 z-[1]
                        block text-xs text-white
                        font-medium rounded bg-gray-700
                        w-max px-3 py-2 
                        -translate-y-2 invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
                        after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
                        after:-translate-x-1/2 after:left-1/2"
                      >
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
                <div className="py-3">
                  <input
                    type="text"
                    placeholder="Title"
                    className="p-3 w-full focus:outline-none border border-transparent rounded hover:border-gray-300 focus:border-gray-300"
                  />
                  <textarea
                    placeholder="Description"
                    rows={3}
                    className="w-full focus:outline-none p-3 mt-3 border border-transparent rounded hover:border-gray-300 focus:border-gray-300"
                  />
                </div>
              </div>
              <button className="absolute right-0 bottom-0 bg-blue-600 text-white font-normal text-sm py-2 px-3 rounded-tl-lg">
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
