import React, { useContext, useState } from "react";

import Button from "../button/button";

import { UserContext } from "../../context/user.context";
import { TaskContext } from "../../context/tasks/tasks.context";

import { createNewTask } from "../../utils/api/appwrite.api";

import { createNewList } from "../../context/tasks/tasks.action";

const FIELDS = {
  title: "",
  description: "",
  selectedList: { id: "", name: "" },
};

function TaskModal({ onCloseModal }) {
  const { user } = useContext(UserContext);
  const { userLists } = useContext(TaskContext);
  const [fields, setFields] = useState(FIELDS);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showListIput, setShowListInput] = useState(false);
  const [listName, setListName] = useState("");

  const { title, description, selectedList } = fields;

  const handleOnChangeFields = (e) => {
    const { name, value, id: listId } = e.target;

    if (name === "selectedList") {
      setFields((preValues) => ({
        ...preValues,
        selectedList: { id: listId, name: value },
      }));
    } else {
      setFields((preValues) => ({ ...preValues, [name]: value }));
    }

    setShowDropdown(false);
  };

  const addNewTask = async () => {
    if (!title || !description || !selectedList.name) {
      console.log("fields are required.");
      return;
    }

    if (!user) return;

    try {
      const DATA = { title, description, selectedList };
      const docRef = await createNewTask(user.$id, DATA);
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitNewList = (e) => {
    e.preventDefault();

    createNewList(user.$id, listName);
  };

  return (
    <div className="fixed left-0 top-0 w-full h-screen z-[10] md:max-w-md md:right-8 md:bottom-20 md:left-auto md:h-max md:top-auto">
      <div className="bg-white py-8 pb-4 px-6 relative h-full md:rounded-md shadow-xl shadow-gray-400">
        <div className="flex items-center">
          <input
            className="w-full px-3 py-2 mr-3 focus:outline-none text-sm"
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={handleOnChangeFields}
          />
          <button onClick={onCloseModal}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          rows="3"
          value={description}
          onChange={handleOnChangeFields}
          className="w-full focus:outline-none border border-transparent hover:border-gray-200 focus:border-gray-200 py-2 px-3 rounded text-sm text-black mt-2"
        ></textarea>
        {/* <div className="py-3">
          <label
            htmlFor="priority"
            className="font-medium tracking-wide text-black"
          >
            Priority:
          </label>
          <div id="priority" className="flex gap-2 mt-2">
            <label htmlFor="urgent" className="relative flex-1">
              <input
                id="urgent"
                type="radio"
                className="absolute inset-0 opacity-0 z-[2] cursor-pointer"
                value="urgent"
                name="priority"
                onChange={handleOnChangeFields}
              />
              <span className="relative z-[1] text-white font-semibold py-3 px-6 bg-red-600 inline-block rounded">
                Urgent
              </span>
            </label>
            <label htmlFor="high" className="relative flex-1">
              <input
                id="high"
                type="radio"
                className="absolute inset-0 opacity-0 z-[2] cursor-pointer"
                value="high"
                name="priority"
                onChange={handleOnChangeFields}
              />
              <span className="relative z-[1] text-white font-semibold py-3 px-6 bg-purple-600 inline-block rounded">
                High
              </span>
            </label>
            <label htmlFor="medium" className="relative flex-1">
              <input
                id="medium"
                type="radio"
                className="absolute inset-0 opacity-0 z-[2] cursor-pointer"
                value="medium"
                name="priority"
                onChange={handleOnChangeFields}
              />
              <span className="relative z-[1] text-white font-semibold py-3 px-6 bg-green-600 inline-block rounded">
                Medium
              </span>
            </label>
            <label htmlFor="low" className="relative flex-1">
              <input
                id="low"
                type="radio"
                className="absolute inset-0 opacity-0 z-[2] cursor-pointer"
                value="low"
                name="priority"
                onChange={handleOnChangeFields}
              />
              <span className="relative z-[1] text-white font-semibold py-3 px-6 bg-yellow-600 inline-block rounded">
                Low
              </span>
            </label>
          </div>
        </div> */}
        <div className="py-3">
          <div className=" flex items-center">
            <span className="text-sm text-gray-600">In</span>
            <div className="relative">
              <button
                onClick={() => setShowDropdown((p) => !p)}
                className="w-[200px] py-2 rounded-3xl border border-gray-200 text-sm font-medium ml-2 flex items-center px-3"
              >
                <span className="material-symbols-outlined text-[22px] text-gray-500 mr-2">
                  search
                </span>
                {selectedList.name ? selectedList.name : "Select List"}
              </button>
              {/* dropdown */}
              {showDropdown && (
                <div className="absolute left-0.5 top-full left-0 w-full z-[10] py-2">
                  <div className="relative p-2 bg-white border border-gray-200 rounded max-h-40 overflow-y-scroll">
                    <div className="pb-2">
                      <input
                        type="text"
                        placeholder="search"
                        autoFocus
                        className="p-2 w-full focus:outline-none"
                      />
                    </div>
                    {userLists.map(({ list_name, $id }) => (
                      <label
                        key={$id}
                        htmlFor={$id}
                        className="block relative w-full"
                      >
                        <input
                          id={$id}
                          type="radio"
                          name="selectedList"
                          className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                          value={list_name}
                          onChange={handleOnChangeFields}
                        />
                        <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                          {list_name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {!showListIput && (
            <button
              onClick={() => setShowListInput(true)}
              className="flex items-center text-sm font-medium text-blue-500"
            >
              <span className="material-symbols-outlined text-lg text-blue-500 mr-0.5">
                add
              </span>
              Create List
            </button>
          )}
          {showListIput && (
            <form className="py-2 flex" onSubmit={handleSubmitNewList}>
              <input
                autoFocus
                type="text"
                placeholder="List"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="w-full px-2 py-2 focus:outline-none border border-transparent rounded text-gray-700 hover:border-gray-200 focus:border-gray-200"
              />
              <button className="font-medium text-sm text-blue-400 flex items-end px-2 ml-0.5">
                add
              </button>
            </form>
          )}
        </div>
        <Button style={{ marginTop: "1rem" }} onClick={addNewTask}>
          Create
        </Button>
      </div>
    </div>
  );
}

export default TaskModal;
