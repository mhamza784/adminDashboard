import { all } from "redux-saga/effects";
import { watchHotListAsync } from "./hotlistsagas";
import { watchUsersAsync } from "./usersagas";
import { watchSearchUsersAsync } from "./searchsaga";


export function* rootSaga() {
  yield all([watchUsersAsync(), watchHotListAsync(), watchSearchUsersAsync()]);
}
