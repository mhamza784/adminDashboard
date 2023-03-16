import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import AlertSlice from "./alert";
import hotlist from "./hotlist";
import search from "./search";

const reducers = combineReducers({
  users,
  search,
  notifications: AlertSlice,
  hotList: hotlist,
});

export default reducers;
