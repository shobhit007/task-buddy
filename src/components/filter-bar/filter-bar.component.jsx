import React, { useState, useContext } from "react";
import { TaskContext } from "../../context/tasks.context";

import "../../calendar.css";
import Calendar from "react-calendar";

function FilterBar() {
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState(new Set());
  const {
    getAscListByDate,
    getDescListByDate,
    getListByDate,
    getListByPriority,
  } = useContext(TaskContext);

  const handleChangeDate = (e) => {
    setDate(e);
    getListByDate(e.toLocaleDateString());
  };

  const onChangeValue = (e) => {
    const { value } = e.target;
    let updatedValues = new Set(priority);
    if (updatedValues.has(value)) {
      updatedValues.delete(value);
      setPriority(updatedValues);
    } else {
      updatedValues.add(value);
      setPriority(updatedValues);
    }

    if (updatedValues.size > 0) getListByPriority(updatedValues);
  };

  return (
    <div className="flex justify-start gap-4 py-8 px-4 bg-transparent">
      {/* priority */}
      <div className="px-4 py-2 bg-white rounded cursor-pointer relative group hover:rounded-b-0">
        <span className="block font-medium antialiased text-center">
          Priority
        </span>
        <div className="flex flex-col gap-1 pt-2 bg-white absolute top-full left-0 opacity-0 hidden invisible group-hover:block group-hover:opacity-100 group-hover:visible">
          <label htmlFor="urgent" className="relative">
            <input
              id="urgent"
              type="checkbox"
              name="priority"
              value="urgent"
              className="peer absolute inset-0 cursor-pointer opacity-0"
              onChange={onChangeValue}
            />
            <span className="block font-medium px-3 py-1 peer-hover:bg-slate-300 rounded-sm peer-checked:bg-blue-500 peer-checked:text-white">
              Urgent
            </span>
          </label>
          <label htmlFor="high" className="relative">
            <input
              id="high"
              type="checkbox"
              name="priority"
              value="high"
              className="peer absolute inset-0 cursor-pointer opacity-0"
              onChange={onChangeValue}
            />
            <span className="block font-medium px-3 py-1 peer-hover:bg-slate-300 rounded-sm peer-checked:bg-blue-500 peer-checked:text-white">
              High
            </span>
          </label>
          <label htmlFor="medium" className="relative">
            <input
              id="medium"
              type="checkbox"
              name="priority"
              value="medium"
              className="peer absolute inset-0 cursor-pointer opacity-0"
              onChange={onChangeValue}
            />
            <span className="block font-medium px-3 py-1 peer-hover:bg-slate-300 rounded-sm peer-checked:bg-blue-500 peer-checked:text-white">
              Medium
            </span>
          </label>
          <label htmlFor="low" className="relative">
            <input
              id="low"
              type="checkbox"
              name="priority"
              value="low"
              className="peer absolute inset-0 cursor-pointer opacity-0"
              onChange={onChangeValue}
            />
            <span className="block font-medium px-3 py-1 peer-hover:bg-slate-300 rounded-sm peer-checked:bg-blue-500 peer-checked:text-white">
              Low
            </span>
          </label>
        </div>
      </div>

      {/* Date picker */}
      <div className="group flex items-center px-3 cursor-pointer rounded relative bg-[rgba(255,255,255,0.7)] hover:bg-slate-300 transition-colors">
        <span className="font-medium text-black antialiased">
          {date.toLocaleDateString()}
        </span>
        <div className="w-max absolute left-0 top-full pt-4 z-[2] hidden opacity-0 invisible group-hover:block group-hover:opacity-100 group-hover:visible">
          <Calendar className="rounded" onChange={handleChangeDate} />
        </div>
      </div>

      {/* sorting */}
      <div className="group w-max relative cursor-pointer">
        <div className="py-2 px-3 bg-white rounded text-black inline-flex items-center font-semibold group-hover:rounded-b-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
          Sort
        </div>
        <div className="absolute w-full top-full z-[2] bg-white opacity-0 invisible -translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={getAscListByDate}
            className="w-full py-2 px-3 font-medium text-black uppercase hover:bg-blue-500 hover:text-white"
          >
            Asc
          </button>
          <button
            onClick={getDescListByDate}
            className="w-full py-2 px-3 font-medium text-black uppercase hover:bg-blue-500 hover:text-white"
          >
            Desc
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
