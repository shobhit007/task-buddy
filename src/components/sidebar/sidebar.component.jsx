import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/user.context";

import { TaskContext } from "../../context/tasks/tasks.context";
import {
  fetchUserListAsync,
  createNewList,
} from "../../context/tasks/tasks.action";

import { listenChanges } from "../../utils/api/appwrite.api";

import ListItem from "../list-item/list-item.compnent";

import { Home, List, X } from "lucide-react";

function Sidebar({ onOpenModal }) {
  const { dispatch, userLists } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
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
          <button className="lg:hidden lg:invisible p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </header>
      <ul className="w-full list-none flex lg:flex-col sm:gap-2 lg:px-8 lg:pb-20 lg:pt-4 lg:sidebar lg:overflow-y-scroll no-scrollbar">
        <li className="flex-1 lg:flex-initial text-center lg:text-left">
          <div className="p-2 text-sm font-medium text-gray-600 flex items-center rounded hover:bg-slate-200">
            <Home size={18} className="text-gray-600 mr-2" />
            <Link to="/" className="block w-full">
              Home
            </Link>
          </div>
        </li>
        <li className="flex-1 lg:flex-initial text-center lg:text-left">
          <div className="p-2 text-sm font-medium text-gray-600 flex items-center rounded hover:bg-slate-200">
            <List size={18} className="text-gray-600 mr-2" />
            <Link to="/tasks" className="block w-full">
              Tasks
            </Link>
          </div>
        </li>
        {userLists.map(({ list_name, $id }) => (
          <ListItem
            key={$id}
            listName={list_name}
            listId={$id}
            onToggleModal={handleModal}
          />
        ))}
      </ul>
      <footer className="hidden invisible lg:block lg:visible pt-1 px-4 absolute bottom-0 w-full h-20">
        <button
          onClick={onOpenModal}
          className="hidden invisible lg:inline-flex lg:visible w-full text-white text-base bg-blue-500 gap-2 py-4 justify-center rounded-md transition-colors hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create task
        </button>
      </footer>

      {showModal && (
        <div className="fixed left-0 top-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.5)]">
          <div className="relative py-4 md:py-16 lg:py-24">
            <div className=" max-w-lg mx-auto bg-slate-200 rounded overflow-hidden">
              <div className="py-6 px-8 bg-white flex justify-between items-center">
                <h2 className="text-2xl text-gray-700">Create List</h2>
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
              <div className="py-4 px-8">
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
