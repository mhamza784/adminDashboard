import { put, takeEvery, call } from "redux-saga/effects";
import { createAlert } from "../slices/alert";
import {
  userHotListApi,
  getUserHotListById,
  removeHotListById,
  getAllHotList,
} from "../service/hotList.service";
import {
  createHotListSlice,
  getAllHotByYouSlice,
  getAllHotSlice,
} from "../slices/hotlist";
import {
  ADD_HOT_LIST_USER,
  HOT_LIST_BY_YOU_USER,
  HOT_LIST_USER,
  REMOVE_HOT_LIST_USER,
} from "../types";

// export function* getUsersSaga() {
//   const users = yield call(getAllUsersAPI);
//   console.log("users", users?.data?.data);
//   yield put(getUsersSlice(users?.data?.data));
// }

// todo get user by id
export function* getUserByIdSaga(action) {
  const { data } = yield getUserHotListById(action.payload);
  yield put(getAllHotSlice(data?.data));
}

export function* getHotListByYouSaga(action) {
  const { data } = yield getAllHotList(action.payload);
  yield put(getAllHotByYouSlice(data?.data));
}

export function* createHotListSaga(action) {
  const user = yield userHotListApi(action.payload);
  if (user?.data?.status == 200) {
    // yield getUserByIdSaga();
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

//Todo  user delete
export function* deleteUserByIdSaga(action) {
  const user = yield removeHotListById(action.payload);
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

export function* watchHotListAsync() {
  yield takeEvery(HOT_LIST_USER, getUserByIdSaga);
  yield takeEvery(HOT_LIST_BY_YOU_USER, getHotListByYouSaga);
  yield takeEvery(ADD_HOT_LIST_USER, createHotListSaga);
  yield takeEvery(REMOVE_HOT_LIST_USER, deleteUserByIdSaga);
}
