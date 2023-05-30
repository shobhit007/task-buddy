import { useContext, useEffect } from "react";
import { TaskContext } from "../../context/tasks.context";

import TaskList from "../tasks-list/tasks-list.component";

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
  const { taskList, getAllTasks, getAscListByDate, getDescListByDate } =
    useContext(TaskContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="h-full w-full overflow-hiddens">
      <div className="py-4 px-3 lg:pt-8 lg:pb-28 lg:pl-8 lg:pr-8 bg-transparent h-full overflow-y-scroll">
        <div className="w-full">
          <div className="flex justify-end gap-2 py-3 px-4 bg-transparent mb-4">
            <div className="group w-max relative cursor-pointer">
              <div className="py-2 px-3 bg-white rounded text-black inline-flex items-center font-semibold group-hover:rounded-b-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
                Sort
              </div>
              <div className="absolute w-full top-full z-[2] bg-white opacity-0 invisible -translate-y-4 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button
                  onClick={getAscListByDate}
                  className="w-full py-2 px-3 font-medium text-black uppercase hover:bg-blue-500 hover:text-white"
                >
                  Asc
                </button>
                <button
                  onClick={getDescListByDate}
                  className="w-full py-2 px-3 font-medium text-black uppercase hover:bg-blue-500 hover:text-white"
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
          <TaskList items={taskList} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
