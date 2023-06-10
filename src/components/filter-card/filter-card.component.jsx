import React, { useReducer, useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../calendar.css";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";
import { CalendarDays, Check, Flag } from "lucide-react";

const priorityColors = {
  3: "#ef4444",
  2: "#facc15",
  1: "#3b82f6",
  0: "#6b7280",
};

const INITIAL_STATE = {
  date: "",
  status: "",
  priorities: new Set(),
};

const ACTION_TYPES = {
  SET_DATE: "SET_DATE",
  SET_STATUS: "SET_STATUS",
  SET_PRIORITY: "SET_PRIORITY",
};

const priorityOptions = [
  {
    key: "urgent",
    name: "Urgent",
    value: 3,
    color: "red-600",
  },
  {
    key: "high",
    name: "High",
    value: 2,
    color: "yellow-400",
  },
  {
    key: "normal",
    name: "Normal",
    value: 1,
    color: "blue-500",
  },
  {
    key: "low",
    name: "Low",
    value: 0,
    color: "gray-500",
  },
  {
    key: "no",
    name: "No priority",
    value: -1,
    color: "transparent",
  },
];

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

const Flags = ({ priorityMap }) => {
  return (
    <span className="flex items-center gap-0.5">
      {[...priorityMap].map((value) => (
        <Flag
          key={value}
          fill={
            priorityColors[value] ? `${priorityColors[value]}` : "transparent"
          }
          className={`text-${priorityColors[value]}`}
          size={14}
        />
      ))}
    </span>
  );
};

function FilterCard({ closeFilterCard, onChangeFilter }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [selectedDate, setSelectedDate] = useState(null);

  const { date, priorities, status } = state;

  const isSelected = (value) => value === status;

  const setPriorities = (value, callback) => {
    const updatedPriorities = new Set(priorities);

    if (updatedPriorities.has(value)) {
      updatedPriorities.delete(value);
    } else {
      updatedPriorities.add(value);
    }

    dispatch({ type: ACTION_TYPES.SET_PRIORITY, payload: updatedPriorities });
    callback();
  };

  const setStatus = (value, callback) => {
    dispatch({ type: ACTION_TYPES.SET_STATUS, payload: value });
    callback();
  };

  const setDate = (callback) => {
    dispatch({
      type: ACTION_TYPES.SET_DATE,
      payload: selectedDate.toLocaleDateString(),
    });
    callback();
  };

  const handleFilterTasks = () => {
    if (!status && !selectedDate && !priorities.size > 0) {
      console.log("select at least one filter");
      return;
    }
    onChangeFilter({
      status,
      selectedDate: date,
      priorities,
    });
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

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-black">Status:</span>
            <Select placement="bottom" offsetY={8}>
              <SelectTrigger>
                <button className="w-48 text-left border border-gray-400 rounded text-sm text-gray-700 p-2 ml-8">
                  {status || "Select status"}
                </button>
              </SelectTrigger>
              <SelectContent
                renderItem={(onClose) => (
                  <div className="flex flex-col gap-2 p-2">
                    <button
                      className="w-full p-2 hover:bg-slate-100 rounded text-sm text-left flex items-center"
                      onClick={() => setStatus("complete", onClose)}
                    >
                      Complete
                      {isSelected("complete") && (
                        <Check size={14} className="text-blue-500 ml-auto" />
                      )}
                    </button>
                    <button
                      className="w-full p-2 hover:bg-slate-100 rounded text-sm text-left flex items-center"
                      onClick={() => setStatus("pending", onClose)}
                    >
                      Pending
                      {isSelected("pending") && (
                        <Check size={14} className="text-blue-500 ml-auto" />
                      )}
                    </button>
                  </div>
                )}
              />
            </Select>
          </div>

          <div className="flex items-center gap-10">
            <span className="text-sm font-medium text-black">Priorities:</span>
            <Select placement="bottom" offsetY={8}>
              <SelectTrigger>
                <button className="w-48 text-left border border-gray-400 rounded text-sm text-gray-700 p-2">
                  {priorities.size > 0 ? (
                    <Flags priorityMap={priorities} />
                  ) : (
                    "Select Priorities"
                  )}
                </button>
              </SelectTrigger>
              <SelectContent
                renderItem={(onClose) =>
                  priorityOptions.map(({ key, name, value, color }) => (
                    <button
                      key={key}
                      className="w-full py-2 px-3 hover:bg-slate-100 text-sm text-left flex items-center"
                      onClick={() => setPriorities(value, onClose)}
                    >
                      <Flag
                        fill={
                          priorityColors[value]
                            ? `${priorityColors[value]}`
                            : "transparent"
                        }
                        className={`text-${color} mr-2`}
                        size={14}
                      />
                      {name}
                      {priorities.has(value) && (
                        <Check size={14} className="text-blue-500 ml-auto" />
                      )}
                    </button>
                  ))
                }
              />
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-black">
              Created date:
            </span>

            <Select placement="bottom" offsetY={8}>
              <SelectTrigger>
                <button className="w-48 text-left border border-gray-400 rounded text-sm text-gray-700 p-2 flex items-center">
                  <CalendarDays size={14} className="mr-2" />
                  {date || "Select date"}
                </button>
              </SelectTrigger>
              <SelectContent
                renderItem={(onClose) => (
                  <div className="relative p-2">
                    <DayPicker
                      mode="single"
                      showOutsideDays
                      required
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      modifiersClassNames={{
                        today: ".today",
                        selected: "selected",
                      }}
                      fromYear={new Date().getFullYear()}
                    />
                    <button
                      onClick={() => setDate(onClose)}
                      className="absolute right-0 bottom-0 px-3 py-0.5 bg-blue-600 text-white text-md font-normal rounded-br-md rounded-tl-md"
                    >
                      select
                    </button>
                  </div>
                )}
              />
            </Select>
          </div>
        </div>

        <button onClick={handleFilterTasks}>Filter</button>
      </div>
    </div>
  );
}

export default FilterCard;
