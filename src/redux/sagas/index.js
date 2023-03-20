import { all } from "redux-saga/effects";
import { watchHotListAsync } from "./hotlistsagas";
import { watchUsersAsync } from "./usersagas";
import { watchSearchUsersAsync } from "./searchsaga";
import { watchBlockListAsync } from "./blockedsagas";
import { watchChatAsync } from "./chatsagas";

export function* rootSaga() {
  yield all([
    watchUsersAsync(),
    watchHotListAsync(),
    watchSearchUsersAsync(),
    watchBlockListAsync(),
    watchChatAsync(),
  ]);
}
