import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.saga";
import { taskListSaga } from "./task-list/task-list.saga";
import { listSaga } from "./list/list.saga";
import { taskSagas } from "./task/task.saga";
import { lineupSaga } from "./lineups/lineups.saga";

export function* rootSaga() {
  yield all([
    call(userSagas),
    call(taskListSaga),
    call(listSaga),
    call(taskSagas),
    call(lineupSaga),
  ]);
}
