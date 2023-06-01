import { useContext, useEffect, useState } from "react";

import { TaskContext } from "../../context/tasks/tasks.context";
import { UserContext } from "../../context/user.context";
import { fetchTaskList } from "../../context/tasks/tasks.action";

import TaskList from "../tasks-list/tasks-list.component";
import FilterCard from "../filter-card/filter-card.component";

// const DATA = [
//   {
//     $id: 1,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 2,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 3,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 4,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 5,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 6,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 7,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 8,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 9,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 10,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 11,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 12,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 13,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 14,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
//   {
//     $id: 15,
//     title: "Test",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget tellus convallis, viverra sapien id, faucibus mauris. Ut convallis pharetra leo, quis placerat augue fringilla vel. In ac ex odio.",
//   },
// ];

function Tasks() {
  const [showFilterCard, setShowFilterCard] = useState(false);
  const { taskList, dispatch } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchTaskList(user)(dispatch);
  }, [user, dispatch]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex justify-end pr-10 py-2 bg-white border-y border-t-gray-300 border-solid relative">
        <div className="flex gap-3">
          <button className="relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300" onClick={() => setShowFilterCard(p => !p)}>
            <span className="material-symbols-outlined text-sm mr-0.5">
              filter_list
            </span>
            Filter
          </button>
          <button className="relative flex items-center text-xs font-light py-0.5 px-3 rounded-sm hover:bg-slate-300">
            <span className="material-symbols-outlined text-sm mr-0.5">
              unfold_more
            </span>
            Sort
          </button>
        </div>
       {showFilterCard && <FilterCard />}
      </div>
      <div className="pt-4 pb-4 px-4 lg:pb-28 bg-transparent h-full overflow-y-scroll">
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
        <div className="h-full">
          <TaskList items={taskList} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
