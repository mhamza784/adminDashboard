import { put, takeEvery, call } from "redux-saga/effects";
import { createAlert } from "../slices/alert";
import {
  AddChatApi,
  getUserChatById,
  removeChatById,
} from "../service/chat.service";
import { getChatSlice } from "../slices/chat";
import { ADD_CHAT_USER, CHAT_USER, REMOVE_CHAT_USER } from "../types";

// todo get user by id
export function* getBlockByIdSaga(action) {
  const { data } = yield getUserChatById(action.payload);

  yield put(getChatSlice(data));
}

export function* createBlockListSaga(action) {
  const user = yield AddChatApi(action.payload);
  // if (user?.data?.status == 200) {
  //   yield put(
  //     createAlert({
  //       type: "success",
  //       message: user?.data?.message,
  //       status: true,
  //     })
  //   );
  // } else {
  //   yield put(
  //     createAlert({
  //       type: "error",
  //       message: user?.data?.message,
  //       status: true,
  //     })
  //   );
  // }
}

export function* deleteBlockByIdSaga(action) {
  const user = yield removeChatById(action.payload);
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

export function* watchChatAsync() {
  yield takeEvery(CHAT_USER, getBlockByIdSaga);
  yield takeEvery(ADD_CHAT_USER, createBlockListSaga);
  yield takeEvery(REMOVE_CHAT_USER, deleteBlockByIdSaga);
}
