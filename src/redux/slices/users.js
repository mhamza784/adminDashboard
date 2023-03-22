import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: {
    token: "",
    user: "",
    allUser: [],
    singleUser: {},
  },
  reducers: {
    searchData: (state, action) => {
      return { ...state, allUser: action.payload };
    },
    getUsersSlice: (state, action) => {
      return { ...state, allUser: action.payload };
    },
    createUserSlice: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    forgetPasswordUserSlice: (state, action) => {
      return {
        ...state,
      };
    },
    confirmPasswordUserSlice: (state, action) => {
      return {
        ...state,
      };
    },
    UpdateUserSlice: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    loginUserSlice: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    logoutUserSlice: (state, action) => {
      return {
        ...state,
        user: "",
        token: "",
        singleUser: {},
      };
    },
    singleUserSlice: (state, action) => {
      return {
        ...state,
        singleUser: action.payload,
      };
    },
    // searchUsersSlice: (state, action) => {
    //   console.log("action", action);
    //   return { ...state, searchUser: action.payload };
    // },
    // editUserSlice: (state, action) => {
    //   state = state.map((i) =>
    //     i.id == action.payload.id ? action.payload : i
    //   );
    //   return state;
    // },
    deleteUserSlice: (state, action) => {
      console.log(action.payload, "hecked id");
      state = state.filter((i) => i._id !== action.payload);

      return state;
    },
  },
});
export const {
  getUsersSlice,
  loginUserSlice,
  createUserSlice,
  UpdateUserSlice,
  forgetPasswordUserSlice,
  confirmPasswordUserSlice,
  logoutUserSlice,
  singleUserSlice,
  searchData,
  deleteUserSlice,
  // searchUsersSlice,
} = users.actions;
export default users.reducer;
