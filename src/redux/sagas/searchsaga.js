import { put, takeEvery, call } from "redux-saga/effects";
import { createAlert } from "../slices/alert";
import { userSearchAPI } from "../service/user.service";
import { searchUsersSlice } from "../slices/search";
import { USER_SEARCH } from "../types";
import Router from "next/router";

// todo get user by id
// export function* getUserByIdSaga(action) {
//   yield getUserByIdAPI(action.id);
//   yield put(setUserSlice(action.id));
// }

export function* searchUserSaga(action) {
  const users = yield userSearchAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(searchUsersSlice(users?.data?.data));
    yield put(
      createAlert({
        type: "success",
        message: users?.data?.message,
        status: true,
      })
    );
  } else {
    yield put(
      createAlert({
        type: "error",
        message: users?.data?.message,
        status: true,
      })
    );
  }
}

//Todo  user delete
// export function* deleteUserByIdSaga(action) {
//   yield deleteUserByIdAPI(action.id);
//   yield put(deleteUserSlice(action.id));
// }

export function* watchSearchUsersAsync() {
  yield takeEvery(USER_SEARCH, searchUserSaga);
  //   yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga);
}
