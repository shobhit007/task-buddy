import React, { useState, useContext } from "react";
import FilterCard from "../filter-card/filter-card.component";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";

import { filteredList } from "../../context/tasks/tasks.action";

import { Outlet } from "react-router-dom";
import {
  Check,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ListFilter,
  X,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import Searchbox from "../search-box/search-box.component";
import { useAppContext } from "../../context/app/app.context";

const options = [
  {
    name: "Status",
    key: "status",
    order: "desc",
  },
  {
    name: "Priority",
    key: "priority",
    order: "desc",
  },
  {
    name: "Created date",
    key: "created_at",
    order: "desc",
  },
];

function Header({ list_id }) {
  const { dispatch, lengthOfPendingTasks, lengthOfCompleteTasks } =
    useContext(TaskContext);
  const { user } = useContext(UserContext);

  const { filters } = useAppContext();

  const date = filters.get("date");
  const priorities = filters.get("priorities");
  const status = filters.get("status");

  const [showFilterCard, setShowFilterCard] = useState(false);
  const [sortingOptions, setSortingOptions] = useState(options);
  const [sorting, setSorting] = useState(new Map());

  const handleSortingOptions = (optionKey, optionOrder) => {
    const newSortingOptions = sortingOptions.map((item) => {
      if (item.key === optionKey) {
        item.order = optionOrder === "desc" ? "asc" : "desc";
      }
      return item;
    });

    const newSortingMap = new Map(sorting);

    if (!newSortingMap.has(optionKey)) {
      newSortingMap.set(optionKey, optionOrder);
      filteredList(user, { list_id }, newSortingMap)(dispatch);
      setSorting(newSortingMap);
    } else {
      newSortingMap.delete(optionKey);
      newSortingMap.set(optionKey, optionOrder);
      filteredList(
        user,
        { list_id, status, priorities, selectedDate: date },
        newSortingMap
      )(dispatch);
      setSorting(newSortingMap);
    }

    setSortingOptions(newSortingOptions);
  };

  const handleAscOrder = (key, order) => {
    const newSortingOptions = sortingOptions.map((item) => {
      if (item.key === key) {
        item.order = order === "desc" ? "asc" : "desc";
      }
      return item;
    });

    const sortingMap = new Map(sorting);

    sortingMap.delete(key);
    sortingMap.set(key, order);

    if (order !== sorting.get(key)) {
      filteredList(user, { list_id }, sortingMap)(dispatch);
      setSorting(sortingMap);
      setSortingOptions(newSortingOptions);
    }
  };
  const handleDescOrder = (key, order) => {
    const newSortingOptions = sortingOptions.map((item) => {
      if (item.key === key) {
        item.order = order === "desc" ? "asc" : "desc";
      }
      return item;
    });

    const sortingMap = new Map(sorting);

    sortingMap.delete(key);
    sortingMap.set(key, order);

    if (order !== sorting.get(key)) {
      filteredList(user, { list_id }, sortingMap)(dispatch);
      setSorting(sortingMap);
      setSortingOptions(newSortingOptions);
    }
  };

  const handleFilters = (filters) =>
    filteredList(user, { ...filters, list_id })(dispatch);

  const clearSorting = (key) => {
    const newSortingMap = new Map(sorting);

    newSortingMap.delete(key);

    filteredList(
      user,
      { list_id, status, priorities, selectedDate: date },
      newSortingMap
    )(dispatch);
    setSorting(newSortingMap);
  };

  return (
    <div className="w-full">
      <div className="relative flex justify-between items-center px-10 h-20 bg-white border-y border-gray-300 border-solid">
        <Searchbox />
        <div className="flex gap-3">
          <button
            className={`relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300 ${
              filters.size > 0 && "text-blue-500"
            }`}
            onClick={() => setShowFilterCard((p) => !p)}
          >
            <ListFilter
              size={14}
              className={`mr-0.5 ${
                filters.size > 0 ? "text-blue-500" : "text-gray-600"
              }`}
            />
            {filters.size || "Filter"}
          </button>
          <Select placement="bottom-end" offsetY={24}>
            <SelectTrigger>
              <button
                className={`relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300 ${
                  sorting.size > 0 && "text-blue-500"
                }`}
              >
                <ChevronsUpDown
                  size={14}
                  className={`mr-0.5 ${sorting.size > 0 && "text-blue-500"}`}
                />
                Sort
              </button>
            </SelectTrigger>
            <SelectContent
              renderItem={() => (
                <div className="min-w-[200px] p-2">
                  {sortingOptions.map(({ key, name, order }) => (
                    <div
                      key={key}
                      className="flex items-center hover:bg-slate-200 text-sm px-2 rounded"
                    >
                      {sorting.has(key) && (
                        <div className="flex flex-col">
                          <button onClick={() => handleAscOrder(key, "asc")}>
                            <ChevronUp
                              size={13}
                              className="font-bold text-gray-500"
                            />
                          </button>
                          <button onClick={() => handleDescOrder(key, "desc")}>
                            <ChevronDown
                              size={13}
                              className="font-bold text-gray-500"
                            />
                          </button>
                        </div>
                      )}
                      <button
                        className="w-full p-2 flex items-center mt-0.5"
                        onClick={() => handleSortingOptions(key, order)}
                      >
                        {name}
                        {sorting.has(key) && (
                          <Check size={14} className="text-blue-500 ml-auto" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
          </Select>
          {showFilterCard && (
            <FilterCard
              closeFilterCard={() => setShowFilterCard(false)}
              onChangeFilter={handleFilters}
            />
          )}
        </div>
      </div>
      {sorting.size > 0 && (
        <div className="py-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Sorting by
            </span>
            {sorting.has("status") && (
              <div className="flex items-center">
                <button
                  className="p-0.5 border-2 bg-blue-600 rounded-[50%] hover:scale-110"
                  onClick={() => clearSorting("status")}
                >
                  <X size={11} className="text-white" />
                </button>
                <span className="text-xs text-blue-600">Status</span>
              </div>
            )}
            {sorting.has("priority") && (
              <div className="flex items-center">
                <button
                  className="p-0.5 border-2 bg-blue-600 rounded-[50%] hover:scale-110"
                  onClick={() => clearSorting("priority")}
                >
                  <X size={11} className="text-white" />
                </button>
                <span className="text-xs text-blue-600">Priority</span>
              </div>
            )}
            {sorting.has("created_at") && (
              <div className="flex items-center">
                <button
                  className="p-0.5 border-2 bg-blue-600 rounded-[50%] hover:scale-110"
                  onClick={() => clearSorting("created_at")}
                >
                  <X size={11} className="text-white" />
                </button>
                <span className="text-xs text-blue-600">Created date</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="pt-4 px-6 bg-transparent">
        <div className="bg-transparent flex gap-4 pb-4">
          <div className="bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide md:w-60 shadow-md border-t-2 border-t-gray-400">
            Pending
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              {lengthOfPendingTasks}
            </span>
          </div>

          <div className="bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide md:w-60 shadow-md border-t-2 border-t-green-400">
            Complete
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              {lengthOfCompleteTasks}
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
