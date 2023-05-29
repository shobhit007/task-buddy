import React, { useContext, useState } from "react";

import Input from "../input/input.component";
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
    // if (!title || !description) {
    //   console.log("fields are required.");
    //   return;
    // }

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
    <div className="max-w-lg my-0 mx-auto bg-white p-14 rounded-md relative">
      <div className="py-3">
        <label htmlFor="title" className="font-medium tracking-wide text-black">
          Title:
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={handleOnChangeFields}
        />
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
      <button className="absolute top-8 right-8 p-3" onClick={onCloseModal}>
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default TaskModal;
