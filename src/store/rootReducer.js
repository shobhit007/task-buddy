import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { taskListReducer } from "./task-list/task-list.reducer";
import { listReducer } from "./list/list.reducer";
import { taskReducer } from "./task/task.reducer";
import { lineUpReducer } from "./lineups/lineups.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  taskList: taskListReducer,
  list: listReducer,
  task: taskReducer,
  lineups: lineUpReducer,
});
