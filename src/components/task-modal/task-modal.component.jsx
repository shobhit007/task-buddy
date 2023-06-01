import React, { useContext, useState } from "react";

import Button from "../button/button";

import { UserContext } from "../../context/user.context";
import { createNewTask } from "../../utils/api/appwrite.api";

const FIELDS = {
  title: "",
  description: "",
  priority: "urgent",
};

function TaskModal({ onCloseModal }) {
  const { user } = useContext(UserContext);
  const [fields, setFields] = useState(FIELDS);

  const { title, description, priority } = fields;

  const handleOnChangeFields = (e) => {
    const { name, value } = e.target;
    setFields((preValues) => ({ ...preValues, [name]: value }));
  };

  const addNewTask = async () => {
    if (!title || !description) {
      console.log("fields are required.");
      return;
    }

    if (!user) return;

    try {
      const DATA = { title, description, priority };
      const docRef = await createNewTask(user.$id, DATA);
      console.log(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-screen z-[10] overflow-hidden md:rounded-md md:max-w-md md:right-8 md:bottom-20 md:left-auto md:h-max md:top-auto shadow-xl shadow-gray-400">
      <div className="bg-white py-8 pb-4 px-6 relative h-full">
        <div className="flex items-center">
          <input
            className="w-full px-3 py-2 mr-3 focus:outline-none font-medium"
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
        <div className="py-3">
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
        </div>
        <div className="py-3">
          <label
            htmlFor="description"
            className="font-medium tracking-wide text-black"
          >
            Description:
          </label>
          <textarea
            className="w-full bg-white rounded border-2 border-slate-300 focus:border-slate-400 focus:outline-none p-3 mt-2"
            id="description"
            type="text"
            placeholder="Enter description"
            rows={6}
            name="description"
            value={description}
            onChange={handleOnChangeFields}
          />
        </div>
        <Button style={{ marginTop: "1.25rem" }} onClick={addNewTask}>
          Create
        </Button>
      </div>
    </div>
  );
}

export default TaskModal;
