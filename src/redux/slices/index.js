import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import AlertSlice from "./alert";
import hotlist from "./hotlist";
import search from "./search";
import blocked from "./blocked";

import chat from "./chat";

const reducers = combineReducers({
  users,
  search,
  chat,
  blocked,
  notifications: AlertSlice,
  hotList: hotlist,
});

export default reducers;
