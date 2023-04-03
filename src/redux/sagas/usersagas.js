import { put, takeEvery, call } from "redux-saga/effects";
import { createAlert } from "../slices/alert";
import {
  createUserAPI,
  userLoginAPI,
  updateUserPasswordAPI,
  updateUserAPI,
  getAllUsersAPI,
  forgetPasswordUserAPI,
  confirmUserPasswordAPI,
  deleteUserByIdAPI,
  // userSearchAPI
  userNotificationAPI,
  getUserByIdAPI,
} from "../service/user.service";
import {
  createUserSlice,
  getUsersSlice,
  loginUserSlice,
  UpdateUserSlice,
  logoutUserSlice,
  singleUserSlice,
  forgetPasswordUserSlice,
  confirmPasswordUserSlice,
  deleteUserSlice,
  // searchUsersSlice
} from "../slices/users";
import {
  CREATE_USER,
  DEACTIVE_USER,
  GET_ALL_USERS,
  GET_USERS,
  LOGOUT,
  UPDATE_PASSWORD,
  UPDATE_USER,
  USER_LOGIN,
  SINGLE_USER,
  FORGET_PASSWORD,
  CONFIRM_PASSWORD,
  DELETE_USER_BY_ID,
  SEND_USER_NOTIFICATION
  // USER_SEARCH
} from "../types";
import Router from "next/router";

export function* getUsersSaga() {
  const users = yield call(getAllUsersAPI);
  yield put(getUsersSlice(users?.data?.data));
}

// todo get user by id
export function* getUserByIdSaga(action) {
  const { data } = yield getUserByIdAPI(action.payload.id);

  yield put(singleUserSlice(data?.data));
}

export function* createUserSaga(action) {
  const user = yield createUserAPI(action.payload);

  if (user?.data?.status == 200) {
    yield put(createUserSlice(user?.data?.data));
    Router.push("/home");
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

// export function* searchUserSaga(action) {
//   console.log(action.payload);
//   const users = yield userSearchAPI(action.payload);
//   if (users?.data?.status == 200) {
//     yield put(searchUsersSlice(users?.data?.data));
//     yield put(
//       createAlert({
//         type: "success",
//         message: users?.data?.message,
//         status: true,
//       })
//     );
//   } else {
//     yield put(
//       createAlert({
//         type: "error",
//         message: users?.data?.message,
//         status: true,
//       })
//     );
//   }
// }

export function* UserNotificationSaga(action) {
  const users = yield userNotificationAPI(action.payload);
  if (users?.data?.status == 200) {
    // yield put(loginUseSlice(users?.data?.data));
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
export function* UserLoginSaga(action) {
  const users = yield userLoginAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(loginUserSlice(users?.data?.data));
    Router.push("/admin");
    yield put(
      createAlert({
        type: "success",
        // message: users?.data?.message,
        // status: true,
      })
    );
  } else {
    yield put(
      createAlert({
        type: "error",
        // message: users?.data?.message,
        status: true,
      })
    );
  }
}

export function* updateUserPasswordSaga(action) {
  const users = yield updateUserPasswordAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(UpdateUserSlice(users?.data?.data));
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
export function* confirmUserPasswordSaga(action) {
  console.log(action);
  const users = yield confirmUserPasswordAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(confirmPasswordUserSlice(users?.data?.data));
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
export function* forgetUserPasswordSaga(action) {
  const users = yield forgetPasswordUserAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(forgetPasswordUserSlice(users?.data?.data));
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
export function* updateUserSaga(action) {
  const users = yield updateUserAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(UpdateUserSlice(users?.data?.data));
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
export function* updateDeactiveUserSaga(action) {
  const users = yield updateUserAPI(action.payload);
  if (users?.data?.status == 200) {
    yield put(logoutUserSlice());
    Router.push("/");
  }
}
export function* logoutUserSaga(action) {
  yield updateUserAPI(action.payload);
  yield put(logoutUserSlice());
  Router.push("/login");
  yield put(
    createAlert({
      type: "success",
      message: "Logout SuccessFully",
      status: true,
    })
  );
}

//Todo  user delete
export function* deleteUserByIdSaga(action) {
  yield deleteUserByIdAPI(action.payload);
  yield put(deleteUserSlice(action.payload));
}

export function* watchUsersAsync() {
  yield takeEvery(GET_ALL_USERS, getUsersSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(USER_LOGIN, UserLoginSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
  yield takeEvery(DEACTIVE_USER, updateDeactiveUserSaga);
  yield takeEvery(UPDATE_PASSWORD, updateUserPasswordSaga);
  yield takeEvery(CONFIRM_PASSWORD, confirmUserPasswordSaga);
  yield takeEvery(FORGET_PASSWORD, forgetUserPasswordSaga);
  yield takeEvery(LOGOUT, logoutUserSaga);
  yield takeEvery(SINGLE_USER, getUserByIdSaga);
  yield takeEvery(DELETE_USER_BY_ID, deleteUserByIdSaga);
  yield takeEvery(SEND_USER_NOTIFICATION, UserNotificationSaga);
}
