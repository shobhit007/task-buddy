import { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "../select/select.component";

import { listenChanges } from "../../utils/api/appwrite.api";

import Modal from "../modal/modal.component";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectTaskList } from "../../store/task-list/task-list.selector";
import { selectLineups } from "../../store/lineups/lineups.selector";

import { fetchTaskListStart } from "../../store/task-list/task-list.actions";

import {
  fetchLineUpStart,
  createLineUpStart,
  deleteLineUpStart,
} from "../../store/lineups/lineups.actions";

function Home() {
  // const { taskList, dispatch } = useContext(TaskContext);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(selectCurrentUser);
  const { taskList } = useSelector(selectTaskList);
  const { lineups } = useSelector(selectLineups);

  const [filteredList, setFilteredList] = useState(taskList);
  const [search, setSearch] = useState("");
  const [lineupsList, setLineupsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({});

  const ref = useRef(null);

  // fetch task list
  useEffect(() => {
    if (!currentUser) return;

    dispatch(fetchTaskListStart(currentUser.$id));
  }, [currentUser, dispatch]);

  // listen changes for task list
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenChanges(() => {
      dispatch(fetchTaskListStart(currentUser.$id));
    });

    return () => unsubscribe();
  }, [currentUser, dispatch]);

  // Filter lineups
  useEffect(() => {
    const filteredLineUps = lineups.map((lineup) => {
      const task = taskList.find((task) => task.$id === lineup.taskid);
      return { lineupId: lineup.$id, ...task };
    });
    setLineupsList(filteredLineUps);
  }, [lineups, taskList]);

  // FetchLineups
  useEffect(() => {
    if (!currentUser) return;

    dispatch(fetchLineUpStart(currentUser.$id));
  }, [currentUser, dispatch]);

  // Listen changes for lineups
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenChanges(async () => {
      dispatch(fetchLineUpStart(currentUser.$id));
    });

    return () => unsubscribe();
  }, [dispatch, currentUser]);

  // Search
  useEffect(() => {
    const newFiteredList = taskList.filter((task) => {
      return task.title.toLowerCase().includes(search.toLocaleLowerCase());
    });

    setFilteredList(newFiteredList);
  }, [search, taskList]);

  const handleCreateLineup = (task, onSelectClose) => {
    const isExist = lineups.find((lineup) => lineup.$id === task.$id);
    if (!isExist) {
      dispatch(createLineUpStart(task.userid, task.$id));
    }

    onSelectClose();
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

  const handleDeleteLineUp = (id) => {
    console.log(id);
    dispatch(deleteLineUpStart(id));
  };

  const handleShowModal = (task) => {
    setTask(task);
    setShowModal(true);
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-4">
          LineUp Your Tasks
        </h2>
        <div className="max-w-lg bg-slate-200 p-2 md:p-4 rounded">
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
              renderItem={(onSelectClose) => (
                <div className="relative md:p-4 w-56 md:w-80 max-w-md overflow-hidden overflow-y-scroll max-h-72">
                  <input
                    type="text"
                    placeholder="Search by title"
                    autoFocus
                    className="w-full text-sm text-gray-500 p-2 focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="py-2">
                    {filteredList.map((task) => (
                      <button
                        key={task.$id}
                        onClick={() => handleCreateLineup(task, onSelectClose)}
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
            <div className="group relative bg-slate-200 px-2 py-2 md:py-3 rounded flex-nowrap">
              <div
                className="items-stretch flex gap-3 overflow-x-scroll no-scrollbar"
                ref={ref}
              >
                {lineupsList.map((lineup) => (
                  <div
                    key={lineup?.lineupId}
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
