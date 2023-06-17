import React, { useState } from "react";

import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";
import Tooltip from "../tooltip/tooltip.component";

import CustomLink from "../custom-link/custom-link.componenet";

import { useDispatch } from "react-redux";

import { editListStart, deleteListStart } from "../../store/list/list.actions";

const makeLink = (link) => {
  const regex = /\s/g;
  return link.replace(regex, "-").toLowerCase();
};

function ListItem({ listId, listName, onToggleModal }) {
  const [isRename, setIsRename] = useState(false);
  const [listInput, setListInput] = useState(listName);

  const dispatch = useDispatch();

  const handleDeleteList = (callback) => {
    dispatch(deleteListStart(listId));
    callback();
  };

  const showRenameListInput = (callback) => {
    setIsRename(true);
    callback();
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setListInput(value);
  };

  const hanldeOnSubmit = (e) => {
    e.preventDefault();
    dispatch(editListStart(listId, { list_name: listInput }));
    setIsRename(false);
  };

  const handleOnToggleModal = (callback) => {
    callback();
    onToggleModal();
  };

  return (
    <li className="flex-1 lg:flex-initial text-left lg:rounded hover:bg-slate-200">
      <div className="group text-sm pr-2 font-medium text-gray-600 flex items-center rounded hover:bg-slate-200">
        {isRename ? (
          <form className="flex w-full" onSubmit={hanldeOnSubmit}>
            <input
              type="text"
              placeholder="List"
              autoFocus
              value={listInput}
              onChange={handleOnChange}
              className="w-full focus:outline-none border border-transparent rounded hover:border-text-gray-300 py-2 pl-2 font-normal text-gray-600 text-sm bg-transparent focus:border-blue-400"
            />
          </form>
        ) : (
          <div className="w-full flex items-center justify-between">
            <CustomLink
              to={`/tasks/${makeLink(listName)}`}
              state={{ list_id: listId }}
            >
              {listName}
            </CustomLink>
            <Select>
              <SelectTrigger>
                <Tooltip content="List Settings">
                  <button className="lg:opacity-0 group-hover:opacity-100">
                    <MoreHorizontal
                      size={16}
                      className="text-slate-600 ml-auto"
                    />
                  </button>
                </Tooltip>
              </SelectTrigger>

              <SelectContent
                renderItem={(onClose) => (
                  <div className="py-3 px-2 flex flex-col gap-1">
                    <button
                      className="flex items-center w-full p-2 rounded hover:bg-slate-200"
                      onClick={() => handleOnToggleModal(onClose)}
                    >
                      <Plus
                        size={14}
                        className="text-gray-600 font-medium mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        Create new list
                      </span>
                    </button>
                    <button
                      className="flex items-center w-full p-2 rounded hover:bg-slate-200"
                      onClick={() => showRenameListInput(onClose)}
                    >
                      <Pencil
                        size={14}
                        className="text-gray-600 font-medium mr-2"
                      />
                      <span className="text-sm text-gray-600">Rename</span>
                    </button>
                    <button
                      className="flex items-center w-full p-2 rounded hover:bg-slate-200"
                      onClick={() => handleDeleteList(onClose)}
                    >
                      <Trash2
                        size={14}
                        className="text-red-600 font-medium mr-2"
                      />
                      <span className="text-sm text-gray-600">Delete</span>
                    </button>
                  </div>
                )}
              />
            </Select>
          </div>
        )}
      </div>
    </li>
  );
}

export default ListItem;
