import React, { useEffect, useState } from "react";

import Button from "../button/button";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectList } from "../../store/list/list.selector";

import { createListStart } from "../../store/list/list.actions";
import { createTaskStart } from "../../store/task/task.action";

const FIELDS = {
  title: "",
  description: "",
};

function TaskModal({ onCloseModal }) {
  const dispatch = useDispatch();
  const { list } = useSelector(selectList);
  const { currentUser: user } = useSelector(selectCurrentUser);

  const [filteredList, setFilteredList] = useState(list);
  const [fields, setFields] = useState(FIELDS);
  const [showListIput, setShowListInput] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedList, setSelectedList] = useState({ name: "", id: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const newFilteredList = list.filter((list) => {
      return list.list_name.toLowerCase().includes(search.toLocaleLowerCase());
    });

    setFilteredList(newFilteredList);
  }, [search, list]);

  const handleOnSearch = (e) => setSearch(e.target.value);

  const { title, description } = fields;

  const handleOnChangeFields = (e) => {
    const { name, value } = e.target;
    setFields((preValues) => ({ ...preValues, [name]: value }));
  };

  const handleSelectedList = (list, callback) => {
    setSelectedList(list);
    callback();
  };

  const addNewTask = () => {
    if (!title || !description || !selectedList.name) {
      console.log("fields are required.");
      return;
    }

    if (!user) return;

    const data = { title, description, selectedList };
    dispatch(createTaskStart(user.$id, data));
  };

  // Create new list
  const handleSubmitNewList = (e) => {
    e.preventDefault();

    dispatch(createListStart(user.$id, listName));
    setShowListInput(false);
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
        <div className="py-3">
          <div className=" flex items-center">
            <span className="text-sm text-gray-600">In</span>
            <div className="relative">
              <Select>
                <SelectTrigger>
                  <button className="w-[200px] py-2 rounded-3xl border border-gray-200 text-sm font-medium ml-2 flex items-center px-3">
                    <span className="material-symbols-outlined text-[22px] text-gray-500 mr-2">
                      search
                    </span>
                    {selectedList.name || "Select List"}
                  </button>
                </SelectTrigger>
                <SelectContent
                  renderItem={(onClose) => (
                    <div className="relative p-2 bg-white max-h-40 overflow-y-scroll">
                      <div className="pb-2">
                        <input
                          type="text"
                          placeholder="search"
                          autoFocus
                          className="p-2 w-full focus:outline-none"
                          value={search}
                          onChange={handleOnSearch}
                        />
                      </div>
                      {filteredList.map(({ list_name, $id }) => (
                        <button
                          key={$id}
                          className="text-sm w-full block text-left p-2 hover:bg-slate-200 rounded"
                          onClick={() =>
                            handleSelectedList(
                              { name: list_name, id: $id },
                              onClose
                            )
                          }
                        >
                          {list_name}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </Select>
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
