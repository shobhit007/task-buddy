import { useEffect } from "react";

import TaskList from "../tasks-list/tasks-list.component";
import Header from "../header/header.component";

import { listenChanges } from "../../utils/api/appwrite.api";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectTaskList } from "../../store/task-list/task-list.selector";

import { fetchTaskListStart } from "../../store/task-list/task-list.actions";
import Spinner from "../spinner/spinner.component";

function Tasks() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectCurrentUser);
  const { filteredList, loading } = useSelector(selectTaskList);

  // Fetch all tasks
  useEffect(() => {
    if (!currentUser) return;

    dispatch(fetchTaskListStart(currentUser.$id));
  }, [currentUser, dispatch]);

  // Listen for changes
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenChanges((e) => {
      const collectionId = e.payload.$collectionId;

      if (collectionId === "647de6c2d35a22e34b6a") {
        dispatch(fetchTaskListStart(currentUser.$id));
      }
    });

    return () => unsubscribe();
  }, [currentUser, dispatch]);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-scroll">
      <Header />
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

export default Tasks;
