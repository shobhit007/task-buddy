import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import {
  createLineupAsync,
  getLineUpsAsync,
  fetchTaskList,
  deleteLineUpAsync,
} from "../../context/tasks/tasks.action";

import { listenChanges } from "../../utils/api/appwrite.api";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";
import Modal from "../modal/modal.component";

function Home() {
  const { taskList, dispatch } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [lineups, setLineups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({});

  const ref = useRef(null);

  // fetch task list
  useEffect(() => {
    fetchTaskList(user)(dispatch);
  }, [user, dispatch]);

  // listen changes for task list
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenChanges(() => {
      fetchTaskList({ $id: user.$id })(dispatch);
    });

    return () => unsubscribe();
  }, [user, dispatch]);

  // Get all lineups
  const getLineUps = useCallback(
    async (userid) => {
      const docs = await getLineUpsAsync(userid);
      if (docs.length) {
        const filteredTasks = docs.map((lineup) => {
          const task = taskList.find((task) => task.$id === lineup.taskid);

          return { ...task, lineupId: lineup.$id };
        });

        setLineups(filteredTasks);
      }
    },
    [taskList]
  );

  useEffect(() => {
    if (!user) return;

    getLineUps(user.$id);
  }, [user, getLineUps]);

  // Listen changes for lineups
  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenChanges(async () => {
      const docs = await getLineUpsAsync(user.$id);
      setLineups(docs);
    });

    return () => unsubscribe();
  }, [getLineUps, user]);

  const handleCreateLineup = (task) => {
    const isExist = lineups.find((lineup) => lineup.$id === task.$id);
    if (!isExist) {
      createLineupAsync(task.userid, task.$id);
    }
    return;
  };

  const slideForward = () => {
    const sliderWidth = ref.current.offsetWidth;
    ref.current.scrollLeft = ref.current.scrollLeft + sliderWidth;
  };

  const slidePrevious = () => {
    const sliderWidth = ref.current.offsetWidth;
    ref.current.scrollLeft = ref.current.scrollLeft - sliderWidth;
  };

  const handleDeleteLineUp = (id) => deleteLineUpAsync(id);

  const handleShowModal = (task) => {
    setTask(task);
    setShowModal(true);
  };

  return (
    <div className="h-full w-full overflow-hidden border border-red-500">
      <div className="p-8">
        <h2 className="text-3xl text-gray-600 mb-4">LineUp Your Tasks</h2>
        <div className="max-w-lg bg-slate-200 p-4 rounded">
          <Select placement="bottom-start" offsetY={20}>
            <SelectTrigger>
              <button className="group/button w-full py-3 flex items-center justify-center rounded border border-gray-400 border-dashed hover:border-blue-500">
                <Plus
                  size={14}
                  className="group-hover/button:text-blue-500 text-gray-600 mr-2"
                />
                <span className="group-hover/button:text-blue-500 text-xs text-gray-600 font-bold">
                  Add your most important tasks here.
                </span>
              </button>
            </SelectTrigger>

            <SelectContent
              renderItem={() => (
                <div className="relative p-4 w-56 md:w-80 max-w-md overflow-hidden overflow-y-scroll max-h-72">
                  <input
                    type="text"
                    placeholder="Search by title"
                    autoFocus
                    className="w-full text-sm text-gray-500 p-2 focus:outline-none"
                  />
                  <div className="py-2">
                    {taskList.map((task) => (
                      <button
                        key={task.$id}
                        onClick={() => handleCreateLineup(task)}
                        className="w-full text-left p-2 text-sm text-gray-500 hover:bg-slate-100"
                      >
                        {task.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
          </Select>
        </div>
        {lineups.length > 0 && (
          <div className="w-full py-4 md:py-8">
            <div className="group relative bg-slate-200 px-2 py-3 rounded flex-nowrap">
              <div
                className="items-stretch flex gap-3 overflow-x-scroll no-scrollbar"
                ref={ref}
              >
                {lineups.map((lineup) => (
                  <div
                    key={lineup?.$id}
                    className="group flex items-center justify-between min-w-[192px] lg:min-w-[288px] bg-white rounded px-3 py-2"
                  >
                    <button
                      className="w-full text-left"
                      onClick={() => handleShowModal(lineup)}
                    >
                      <span className="text-sm text-gray-700">
                        {lineup?.title}
                      </span>
                    </button>
                    <button
                      className="ml-auto lg:opacity-0 lg:group-hover:opacity-100 p-0.5"
                      onClick={() => handleDeleteLineUp(lineup?.lineupId)}
                    >
                      <X size={14} className="text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={slidePrevious}
                className="absolute h-full w-16 flex justify-center items-center bg-[rgba(0,0,0,0.5)] top-0 left-0 opacity-0 invisible lg:group-hover:visible lg:group-hover:opacity-100"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>

              <button
                onClick={slideForward}
                className="absolute h-full w-16 flex justify-center items-center bg-[rgba(0,0,0,0.5)] top-0 right-0 opacity-0 invisible lg:group-hover:visible lg:group-hover:opacity-100"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal task={task} onCloseModal={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Home;
