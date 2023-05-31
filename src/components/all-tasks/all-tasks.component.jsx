import { useContext, useEffect } from "react";
// import { TaskContext } from "../../context/tasks.context";

import TaskList from "../tasks-list/tasks-list.component";
import { Context } from "../../context/tasks/tasks.context";

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
  // const { taskList, getAllTasks } = useContext(TaskContext);
  const { taskList, fetchTaskList } = useContext(Context);

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <div className="h-full w-full overflow-hiddens">
      <div className="pt-0 pb-4 px-4 lg:pb-28 bg-transparent h-full overflow-y-scroll">
        <div className="w-full">
          <TaskList items={taskList} />
        </div>
      </div>
    </div>
  );
}

export default Tasks;
