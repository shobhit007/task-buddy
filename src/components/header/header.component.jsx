import React, { useState, useEffect } from "react";
import FilterCard from "../filter-card/filter-card.component";

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

import { useDispatch, useSelector } from "react-redux";

import {
  lengthOfCompleteTasks,
  lengthOfPendingTasks,
  selectTaskList,
} from "../../store/task-list/task-list.selector";

import { selectCurrentUser } from "../../store/user/user.selector";

import {
  setSorting,
  clearSorting,
  setFilteredList,
} from "../../store/task-list/task-list.actions";

const sortingOptions = [
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
  const [search, setSearch] = useState("");
  const [showFilterCard, setShowFilterCard] = useState(false);

  const completeTasks = useSelector(lengthOfCompleteTasks);
  const pendingTasks = useSelector(lengthOfPendingTasks);
  const { sorting, filters, taskList } = useSelector(selectTaskList);
  const { currentUser } = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const filteredList = taskList.filter((task) => {
      return task.title.toLowerCase().includes(search.toLocaleLowerCase());
    });

    dispatch(setFilteredList(filteredList));
  }, [search, taskList, dispatch]);

  const handleSorting = (key, value) => {
    const sortingOption = sorting.has(key);
    if (sortingOption) {
      const sortingValue = sorting.get(key);
      value = sortingValue === "desc" ? "asc" : "desc";
    }
    dispatch(
      setSorting(key, value, sorting, filters, list_id, currentUser.$id)
    );
  };

  const handleAscOrder = (key, order) => {
    if (order !== sorting?.get(key)) {
      dispatch(
        setSorting(key, order, sorting, filters, list_id, currentUser.$id)
      );
    }
  };
  const handleDescOrder = (key, order) => {
    if (order !== sorting?.get(key)) {
      dispatch(
        setSorting(key, order, sorting, filters, list_id, currentUser.$id)
      );
    }
  };

  // Clear sorting
  const handleClearSorting = (key) =>
    dispatch(clearSorting(key, sorting, filters, list_id, currentUser.$id));

  const handleOnChange = (e) => setSearch(e.target.value);

  return (
    <div className="w-full">
      <div className="relative flex flex-wrap lg:flex-nowrap justify-between items-center px-2 md:px-4 lg:px-10 h-24 lg:h-20 bg-white border-y border-gray-300 border-solid">
        <Searchbox search={search} onChange={handleOnChange} />
        <div className="w-full lg:w-max flex gap-3">
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
                        onClick={() => handleSorting(key, order)}
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
              listId={list_id}
              closeFilterCard={() => setShowFilterCard(false)}
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
                  onClick={() => handleClearSorting("status")}
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
                  onClick={() => handleClearSorting("priority")}
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
                  onClick={() => handleClearSorting("created_at")}
                >
                  <X size={11} className="text-white" />
                </button>
                <span className="text-xs text-blue-600">Created date</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="pt-4 px-3 lg:px-6 bg-transparent">
        <div className="flex gap-2 md:gap-4 pb-2 lg:pb-4">
          <div className="w-full md:w-64 bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide shadow-md border-t-2 border-t-gray-400">
            Pending
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              {pendingTasks}
            </span>
          </div>

          <div className="w-full md:w-64 bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide shadow-md border-t-2 border-t-green-400">
            Complete
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              {completeTasks}
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
