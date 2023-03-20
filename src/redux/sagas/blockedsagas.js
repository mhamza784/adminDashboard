import { put, takeEvery, call } from "redux-saga/effects";
import { createAlert } from "../slices/alert";
import {
  userAddBlockedApi,
  getUserBlockedListById,
  removeBlockedById,
} from "../service/blocked.service";
import { getAllBlockedSlice } from "../slices/blocked";
import { ADD_BLOCK_USER, BLOCKED_USER, REMOVE_BLOCK_USER } from "../types";

// todo get user by id
export function* getBlockByIdSaga(action) {
  const { data } = yield getUserBlockedListById(action.payload);
  yield put(getAllBlockedSlice(data?.data));
}

export function* createBlockListSaga(action) {
  const user = yield userAddBlockedApi(action.payload);
  if (user?.data?.status == 200) {
    yield put(
      createAlert({
        type: "success",
        message: user?.data?.message,
        status: true,
      })
    );
  } else {
    yield put(
      createAlert({
        type: "error",
        message: user?.data?.message,
        status: true,
      })
    );
  }
}

export function* deleteBlockByIdSaga(action) {
  const user = yield removeBlockedById(action.payload);
  if (user?.data?.status == 200) {
    yield put(
      createAlert({
        type: "success",
        message: user?.data?.message,
        status: true,
      })
    );
  } else {
    yield put(
      createAlert({
        type: "error",
        message: user?.data?.message,
        status: true,
      })
    );
  }
}

export function* watchBlockListAsync() {
  yield takeEvery(BLOCKED_USER, getBlockByIdSaga);
  yield takeEvery(ADD_BLOCK_USER, createBlockListSaga);
  yield takeEvery(REMOVE_BLOCK_USER, deleteBlockByIdSaga);
}
