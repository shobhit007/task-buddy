import { useContext } from "react";
import SearchBox from "../search-box/search-box.component";
import { TaskContext } from "../../context/tasks.context";

import TaskList from "../tasks-list/tasks-list.component";

function Category() {
  const { taskList } = useContext(TaskContext);

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="hidden invisible lg:block lg:visible p-8 bg-white">
        <SearchBox />
      </div>
      <div className="py-4 px-3 lg:pt-12 lg:pb-44 lg:pl-14 lg:pr-16 bg-transparent h-full overflow-y-scroll">
        <div className="w-full">
          <TaskList items={taskList} />
        </div>
      </div>
    </div>
  );
}

export default Category;
