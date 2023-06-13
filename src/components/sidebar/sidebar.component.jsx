import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { TaskContext } from "../../context/tasks/tasks.context";
import {
  fetchUserListAsync,
  createNewList,
} from "../../context/tasks/tasks.action";

import { listenChanges } from "../../utils/api/appwrite.api";

import ListItem from "../list-item/list-item.compnent";

import { ChevronDown, ChevronUp, Home, List, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import CustomLink from "../custom-link/custom-link.componenet";

function Sidebar() {
  const { dispatch, userLists } = useContext(TaskContext);
  const { user, logOutUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [showAccr, setShowAccr] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    if (!user) return;

    fetchUserListAsync(user.$id)(dispatch);
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenChanges((e) => {
      fetchUserListAsync(user.$id)(dispatch);
    });

    return () => unsubscribe();
  }, [dispatch, user]);

  const handleModal = () => setShowModal(true);

  const hanldeNewList = () => {
    if (!listName) return;

    createNewList(user.$id, listName);
    setShowModal(false);
  };

  return (
    <div className="w-full lg:w-1/4 bg-white relative border-r border-r-gray-300 border-solid">
      <header className="py-4  border-b-2 border-gray-100 lg:border-none lg:h-20">
        <nav className="flex justify-between items-stretch px-4 lg:px-8 lg:block">
          <h2 className="text-lg font-semibold">TaskBuddy</h2>
          <Select>
            <SelectTrigger>
              <button className="w-8 h-8 rounded-[50%] flex items-center justify-center uppercase font-medium text-sm text-white bg-blue-400 lg:opacity-0 lg:invisible">
                {user?.name?.slice(0, 1)}
              </button>
            </SelectTrigger>
            <SelectContent
              renderItem={() => (
                <button
                  className="w-full p-2 rounded bg-blue-400 hover:bg-blue-500 text-sm text-white"
                  onClick={logOutUser}
                >
                  Log out
                </button>
              )}
            />
          </Select>
        </nav>
      </header>
      <ul className="w-full list-none flex flex-wrap lg:flex-col sm:gap-2 lg:px-8 lg:pb-20 lg:pt-4 lg:sidebar lg:overflow-y-scroll no-scrollbar">
        <li className="flex items-center justify-center lg:justify-start lg:rounded hover:bg-slate-200 px-2">
          <Home
            size={18}
            className="text-gray-600 mr-2 opacity-0 invisible md:opacity-100 md:visible"
          />
          <CustomLink to="/">Home</CustomLink>
        </li>
        <li className="flex items-center justify-center lg:justify-start lg:rounded hover:bg-slate-200 px-2">
          <List
            size={18}
            className="text-gray-600 mr-2 opacity-0 invisible md:opacity-100 md:visible"
          />
          <CustomLink to="/tasks">Tasks</CustomLink>
        </li>

        <div className="w-full py-3 px-2 md:px-0 border-t border-gray-200 md:border-0">
          <button
            className="w-full p-2 rounded border border-gray-200 flex items-center"
            onClick={() => setShowAccr((p) => !p)}
          >
            <span className="text-sm font-medium text-gray-600">List</span>
            {!showAccr ? (
              <ChevronDown size={14} className="ml-auto text-gray-600" />
            ) : (
              <ChevronUp size={14} className="ml-auto text-gray-600" />
            )}
          </button>
          <div
            className={`pt-2 grid accr ${
              showAccr && "open"
            } transition-["grid-template-rows"] duration-300`}
          >
            <div className="overflow-hidden w-full flex flex-col gap-2">
              {userLists.map(({ list_name, $id }) => (
                <ListItem
                  key={$id}
                  listName={list_name}
                  listId={$id}
                  onToggleModal={handleModal}
                />
              ))}
            </div>
          </div>
        </div>
      </ul>

      <footer className="hidden invisible lg:block lg:visible pt-1 px-4 absolute bottom-0 w-full h-20">
        <Select>
          <SelectTrigger>
            <button className="w-12 h-12 rounded-[50%] flex items-center justify-center uppercase font-medium text-sm text-white bg-blue-400">
              {user?.name?.slice(0, 1)}
            </button>
          </SelectTrigger>
          <SelectContent
            renderItem={() => (
              <button
                className="w-full p-2 rounded bg-blue-400 hover:bg-blue-500 text-sm text-white"
                onClick={logOutUser}
              >
                Log out
              </button>
            )}
          />
        </Select>
      </footer>

      {showModal && (
        <div className="fixed left-0 top-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.5)]">
          <div className="relative px-2 py-4 md:py-16 lg:py-24">
            <div className=" max-w-lg mx-auto bg-slate-200 rounded overflow-hidden">
              <div className="p-4 md:py-6 md:px-8 bg-white flex justify-between items-center">
                <h2 className="sm:text-2xl text-gray-700">Create List</h2>
                <button
                  className="group px-3 py-2 rounded bg-slate-200"
                  onClick={() => setShowModal(false)}
                >
                  <X
                    size={18}
                    className="font-semibold text-gray-400 group-hover:rotate-90 group-hover:text-blue-400 transition-all duration-300"
                  />
                </button>
              </div>
              <div className="py-4 px-2 md:px-8">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  List name
                </p>
                <input
                  type="text"
                  placeholder="List"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="py-3 px-2 focus:outline-none border border-gray-300 rounded w-full text-sm text-normal text-gray-700"
                />

                <div className="flex justify-end mt-8">
                  <button
                    className="px-4 py-2 bg-blue-400 text-white text-medium rounded hover:bg-blue-500"
                    onClick={hanldeNewList}
                  >
                    Create List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
