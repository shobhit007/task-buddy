import React, { useState, useContext, Fragment } from "react";
import FilterCard from "../filter-card/filter-card.component";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";

import { filteredList } from "../../context/tasks/tasks.action";
import { Outlet } from "react-router-dom";
import { Check, ChevronUp, ChevronDown } from "lucide-react";

function Navbar({ list_id }) {
  const { dispatch } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [showFilterCard, setShowFilterCard] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const [sorting, setSorting] = useState(new Map());

  const handleSorting = (e) => {
    const { value, name } = e.target;

    const updatedSortingList = new Map(sorting);

    if (!sorting.has(name)) {
      updatedSortingList.set(name, value);
      setSorting(updatedSortingList);
      filteredList(user, { list_id }, updatedSortingList)(dispatch);
    }
  };

  const handleAscOrder = (key) => {
    const updateSortvalue = [...sorting].map((sort) =>
      sort[0] === key ? [sort[0], "asc"] : sort
    );

    const updatedSortingList = new Map(updateSortvalue);

    if (sorting.get(key) !== "asc") {
      setSorting(updatedSortingList);
      filteredList(user, { list_id }, updatedSortingList)(dispatch);
    }
  };

  const handleDescOrder = (key) => {
    const updateSortvalue = [...sorting].map((sort) =>
      sort[0] === key ? [sort[0], "desc"] : sort
    );

    const updatedSortingList = new Map(updateSortvalue);

    if (sorting.get(key) !== "desc") {
      setSorting(updatedSortingList);
      filteredList(user, { list_id }, updatedSortingList)(dispatch);
    }
  };

  const isSelected = (key) => sorting.has(key);

  const handleFilters = (filters) =>
    filteredList(user, { ...filters, list_id })(dispatch);
  return (
    <Fragment>
      <div className="flex justify-end pr-10 py-2 bg-white border-y border-t-gray-300 border-solid relative">
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
          <div className="relative">
            <button className="relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300" onClick={() => setShowSorting(p => !p)}>
              <span className="material-symbols-outlined text-sm mr-0.5">
                unfold_more
              </span>
              Sort
            </button>
            {showSorting && <div className="absolute top-full translate-y-2 right-0 pt-3">
              <div className="relative p-2 bg-white rounded min-w-[200px] border border-gray-200 shadow-md">
                <label htmlFor="status" className="block relative w-full">
                  <input
                    id="status"
                    type="radio"
                    name="status"
                    className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                    value="pending"
                    onChange={handleSorting}
                  />
                  <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                    Status
                    {isSelected("status") && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </span>
                </label>
                <label htmlFor="priority" className="block relative w-full">
                  <input
                    id="priority"
                    type="radio"
                    name="priority"
                    className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                    value="priority"
                    onChange={handleSorting}
                  />
                  <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                    Priority
                    {isSelected("priority") && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </span>
                </label>
                <label htmlFor="created_at" className="block relative w-full">
                  <input
                    id="created_at"
                    type="radio"
                    name="created_at"
                    className="peer absolute inset-0 opacity-0"
                    value="asc"
                    onChange={handleSorting}
                  />
                  <span className="peer-hover:bg-slate-200 relative w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-1">
                      {isSelected("created_at") && (
                        <span className="flex flex-col">
                          <button
                            className="text-xs"
                            onClick={() => handleAscOrder("created_at")}
                          >
                            <ChevronUp
                              size={15}
                              className="font-bold text-gray-500"
                            />
                          </button>
                          <button
                            className="text-xs"
                            onClick={() => handleDescOrder("created_at")}
                          >
                            <ChevronDown
                              size={15}
                              className="font-bold text-gray-500"
                            />
                          </button>
                        </span>
                      )}
                      Created at
                    </span>
                    {isSelected("created_at") && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </span>
                </label>
              </div>
            </div>}
          </div>
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
