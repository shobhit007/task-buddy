import { useEffect } from "react";

import TaskList from "../tasks-list/tasks-list.component";
import Header from "../header/header.component";
import { useLocation } from "react-router-dom";

import { listenChanges } from "../../utils/api/appwrite.api";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectTaskList } from "../../store/task-list/task-list.selector";

import { fetchTaskListByListIdStart } from "../../store/task-list/task-list.actions";

import Spinner from "../spinner/spinner.component";

function Categories() {
  const {
    state: { list_id },
  } = useLocation();

  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectCurrentUser);
  const { filteredList, loading } = useSelector(selectTaskList);

  // Fetch task list by list id
  useEffect(() => {
    if (!currentUser) return;

    dispatch(fetchTaskListByListIdStart(currentUser.$id, list_id));
  }, [currentUser, dispatch, list_id]);

  // Listen changes and fetch task list
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = listenChanges((e) => {
      const collectionId = e.payload.$collectionId;
      if (collectionId === "647de6c2d35a22e34b6a") {
        dispatch(fetchTaskListByListIdStart(currentUser.$id, list_id));
      }
    });

    return () => unsubscribe();
  }, [dispatch, list_id, currentUser]);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-scroll">
      <Header list_id={list_id} />
      <div className="pt-4 px-4 pb-16 lg:pb-28 bg-transparent">
        <div className="h-full">
          {!loading ? (
            <TaskList items={filteredList} />
          ) : (
            <div className="h-full w-full pt-16 flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
