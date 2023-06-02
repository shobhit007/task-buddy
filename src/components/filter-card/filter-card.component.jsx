import React, { Fragment, useReducer, useState } from "react";

import FilterCardRow from "../filter-card-row/filter-card-row.component";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../calendar.css";

const priorityColors = {
  urgent: "text-red-600",
  high: "text-yellow-600",
  normal: "text-blue-600",
  low: "text-gray-600",
};

const INITIAL_STATE = {
  date: null,
  status: "",
  priorities: new Set(),
};

const ACTION_TYPES = {
  SET_DATE: "SET_DATE",
  SET_STATUS: "SET_STATUS",
  SET_PRIORITY: "SET_PRIORITY",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_DATE:
      return { ...state, date: payload };
    case ACTION_TYPES.SET_STATUS:
      return { ...state, status: payload };
    case ACTION_TYPES.SET_PRIORITY:
      return { ...state, priorities: payload };
    default:
      return state;
  }
};

function FilterCard({ closeFilterCard, onChangeFilter }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { date, priorities, status } = state;

  const isSelected = (value) => value === status;
  const isChecked = (value) => priorities.has(value);

  const setPriorities = (e) => {
    const { value } = e.target;
    const updatedPriorities = new Set(priorities);

    if (updatedPriorities.has(value)) {
      updatedPriorities.delete(value);
    } else {
      updatedPriorities.add(value);
    }

    dispatch({ type: ACTION_TYPES.SET_PRIORITY, payload: updatedPriorities });
  };

  const setStatus = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION_TYPES.SET_STATUS, payload: value });
    setShowOptions(false);
  };

  const setDate = () => {
    selectedDate &&
      dispatch({ type: ACTION_TYPES.SET_DATE, payload: selectedDate });
  };

  const handleFilterTasks = () => {
    if (!status && !selectedDate && !priorities.size > 0) {
      console.log("select at least one filter");
      return;
    }

    onChangeFilter({ status, selectedDate: date, priorities });
  };

  return (
    <div className="absolute top-full right-10 py-4 z-20">
      <div className="relative bg-white px-6 pb-8 w-full md:w-[512px] min-h-[140px] rounded-md shadow-lg">
        <div className="flex justify-end pt-2">
          <button
            className="w-8 h-8 hover:bg-slate-200"
            onClick={closeFilterCard}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <h2 className="text-xl text-gray-800 font-medium">Filters</h2>
        {/* Filter Row */}
        <FilterCardRow
          label="Status:"
          buttonlabel={
            <Fragment>
              <span className="text-sm font-normal text-gray-700">
                {status ? status : "Select status"}
              </span>
              <span className="material-symbols-outlined text-lg">
                {showOptions ? "expand_less" : "expand_more"}
              </span>
            </Fragment>
          }
        >
          <div className="absolute top-full left-0 w-full z-[10]">
            <div className="p-2 bg-white border border-gray-200 rounded shadow-xl shadow-gray-300">
              <label htmlFor="pending" className="block relative w-full">
                <input
                  id="pending"
                  type="radio"
                  name="status"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="pending"
                  onChange={setStatus}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  Pending
                  {isSelected("pending") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
              <label htmlFor="complete" className="block relative w-full">
                <input
                  id="complete"
                  type="radio"
                  name="status"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="complete"
                  onChange={setStatus}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  Complete
                  {isSelected("complete") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
            </div>
          </div>
        </FilterCardRow>

        {/* <div className="flex justify-start items-center py-3">
          <span className="text-sm font-medium mr-10">Status:</span>
          <div className="relative w-max">
            <div className="flex">
              <button
                className="relative flex items-center justify-between border border-gray-400 py-0.5 px-2 w-[200px] rounded"
                onClick={() => setShowOptions((p) => !p)}
              >
                <span className="text-sm font-normal text-gray-700">
                  {status ? status : "Select status"}
                </span>
                <span className="material-symbols-outlined text-lg">
                  {showOptions ? "expand_less" : "expand_more"}
                </span>
              </button>
              {status && (
                <button
                  className="p-0 text-xs font-medium flex items-end ml-2"
                  onClick={() =>
                    dispatch({ type: ACTION_TYPES.SET_STATUS, payload: "" })
                  }
                >
                  clear
                </button>
              )}
            </div>

            {showOptions && (
              <div className="absolute top-full left-0 w-full py-2 z-[10]">
                <div className="p-2 bg-white border border-gray-200 rounded shadow-xl shadow-gray-300">
                  <label htmlFor="pending" className="block relative w-full">
                    <input
                      id="pending"
                      type="radio"
                      name="status"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="pending"
                      onChange={setStatus}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Pending
                      {isSelected("pending") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="complete" className="block relative w-full">
                    <input
                      id="complete"
                      type="radio"
                      name="status"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="complete"
                      onChange={setStatus}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Complete
                      {isSelected("complete") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div> */}

        {/* Filter Row */}
        <FilterCardRow
          label="Priorities:"
          buttonlabel={
            <span className="text-sm font-normal text-gray-700 w-full text-left">
              {!priorities.size ? (
                "Select priorities"
              ) : (
                <span className="block flex justify-start gap-0.5">
                  {[...priorities].map((item) => (
                    <span
                      key={item}
                      className={`text-sm font-medium px-0.5 ${priorityColors[item]}`}
                    >
                      {item}
                    </span>
                  ))}
                </span>
              )}
            </span>
          }
        >
          <div className="absolute top-full left-0 w-full z-[10]">
            <div className="p-2 bg-white border border-gray-200 rounded-md shadow-lg">
              <label htmlFor="urgent" className="block relative w-full">
                <input
                  id="urgent"
                  type="checkbox"
                  name="priority"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="urgent"
                  onChange={setPriorities}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  Urgent
                  {isChecked("urgent") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
              <label htmlFor="high" className="block relative w-full">
                <input
                  id="high"
                  type="checkbox"
                  name="priority"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="high"
                  onChange={setPriorities}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  High
                  {isChecked("high") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
              <label htmlFor="normal" className="block relative w-full">
                <input
                  id="normal"
                  type="checkbox"
                  name="priority"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="normal"
                  onChange={setPriorities}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  Normal
                  {isChecked("normal") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
              <label htmlFor="low" className="block relative w-full">
                <input
                  id="low"
                  type="checkbox"
                  name="priority"
                  className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                  value="low"
                  onChange={setPriorities}
                />
                <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                  Low
                  {isChecked("low") && (
                    <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                      check
                    </span>
                  )}
                </span>
              </label>
            </div>
          </div>
        </FilterCardRow>

        {/* <div className="relative flex justify-start items-center py-2">
          <span className="text-sm font-medium mr-5">Priorities:</span>
          <div className="relative">
            <button
              className="relative flex items-center justify-between border border-gray-400 py-2 px-3 w-[200px] rounded"
              onClick={() => setShowPriorities((p) => !p)}
            >
              <span className="text-sm font-normal text-gray-700 w-full text-left">
                {!priorities.size ? (
                  "Select priorities"
                ) : (
                  <span className="block flex justify-start gap-0.5">
                    {[...priorities].map((item) => (
                      <span
                        key={item}
                        className={`text-sm font-medium px-0.5 ${priorityColors[item]}`}
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                )}
              </span>
            </button>
            {showPriorities && (
              <div className="absolute top-full left-0 w-full py-3 z-[10]">
                <div className="p-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <label htmlFor="urgent" className="block relative w-full">
                    <input
                      id="urgent"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="urgent"
                      onChange={setPriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Urgent
                      {isChecked("urgent") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="high" className="block relative w-full">
                    <input
                      id="high"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="high"
                      onChange={setPriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      High
                      {isChecked("high") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="normal" className="block relative w-full">
                    <input
                      id="normal"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="normal"
                      onChange={setPriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Normal
                      {isChecked("normal") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="low" className="block relative w-full">
                    <input
                      id="low"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="low"
                      onChange={setPriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Low
                      {isChecked("low") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div> */}

        {/* Filter Row */}
        <FilterCardRow
          label="Exact date:"
          icon={
            <span className="material-symbols-outlined text-xl mr-1">
              calendar_month
            </span>
          }
          buttonlabel={
            <span className="text-sm font-normal w-full text-left">
              {date ? date.toLocaleDateString() : "Select date"}
            </span>
          }
        >
          <div className="absolute top-full right-0 z-[10]">
            <div className="relative bg-white rounded-md shadow-lg border border-gray-200">
              <DayPicker
                mode="single"
                showOutsideDays
                required
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiersClassNames={{ today: "today", selected: "selected" }}
                fromYear={new Date().getFullYear()}
              />
              <button
                onClick={setDate}
                className="absolute right-0 bottom-0 px-3 py-0.5 bg-blue-600 text-white text-md font-normal rounded-br-md rounded-tl-md"
              >
                select
              </button>
            </div>
          </div>
        </FilterCardRow>
        {/* <div className="relative flex justify-start items-center py-2">
          <span className="text-sm font-medium mr-3">Exact date:</span>
          <button
            className="relative flex items-center justify-between border border-gray-400 py-0.5 px-3 w-[200px] rounded text-gray-700"
            onClick={() => setShowCalendar((p) => !p)}
          >
            <span className="material-symbols-outlined text-xl mr-1">
              calendar_month
            </span>
            <span className="text-sm font-normal w-full text-left">
              {date ? date.toLocaleDateString() : "Select date"}
            </span>
          </button>
          {showCalendar && (
            <div className="absolute top-full right-0 z-[10]">
              <div className="relative bg-white rounded-md shadow-lg border border-gray-200">
                <DayPicker
                  mode="single"
                  showOutsideDays
                  required
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiersClassNames={{ today: "today", selected: "selected" }}
                  fromYear={new Date().getFullYear()}
                />
                <button
                  onClick={setDate}
                  className="absolute right-0 bottom-0 px-3 py-0.5 bg-blue-600 text-white text-md font-normal rounded-br-md rounded-tl-md"
                >
                  select
                </button>
              </div>
            </div>
          )}
        </div> */}
        <button onClick={handleFilterTasks}>Filter</button>
      </div>
    </div>
  );
}

export default FilterCard;
