import React, { useState, useContext, Fragment } from "react";
import FilterCard from "../filter-card/filter-card.component";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";

import { filteredList } from "../../context/tasks/tasks.action";
import { Outlet } from "react-router-dom";
import { Check, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import Searchbox from "../search-box/search-box.component";

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

function Navbar({ list_id }) {
  const { dispatch } = useContext(TaskContext);
  const { user } = useContext(UserContext);
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
      filteredList(user, { list_id }, newSortingMap)(dispatch);
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
  return (
    <Fragment>
      <div className="flex justify-between items-center px-10 py-2 bg-white border-y border-t-gray-300 border-solid relative">
        <Searchbox />
        <div className="flex gap-3">
          <button
            className="relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300"
            onClick={() => setShowFilterCard((p) => !p)}
          >
            <span className="material-symbols-outlined text-sm mr-0.5">
              filter_list
            </span>
            Filter
          </button>
          <Select placement="bottom-end">
            <SelectTrigger>
              <button className="relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300">
                <ChevronsUpDown size={14} className="mr-0.5" />
                Sort
              </button>
            </SelectTrigger>
            <SelectContent
              renderItem={() => (
                <div className="min-w-[200px] pb-2">
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
        </div>
        {showFilterCard && (
          <FilterCard
            closeFilterCard={() => setShowFilterCard(false)}
            onChangeFilter={handleFilters}
          />
        )}
      </div>
      <div className="pt-4 px-6 bg-transparent">
        <div className="bg-transparent flex gap-4 pb-4">
          <div className="bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide md:w-60 shadow-md border-t-2 border-t-gray-400">
            Pending
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              100
            </span>
          </div>

          <div className="bg-white py-3 px-2 rounded text-xs uppercase font-bold text-gray-500 tracking-wide md:w-60 shadow-md border-t-2 border-t-green-400">
            Complete
            <span className="inline-block p-3 py-[1px] border-[1px] border-solid border-slate-300 font-semibold ml-2 rounded-xl">
              10
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
