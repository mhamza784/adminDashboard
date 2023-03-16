import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "search",
  initialState: {
    token: "",
    user: "",
    allUser: [],
  },
  reducers: {
    searchUsersSlice: (state, action) => {
      return { ...state, searchUser: action.payload };
    },
    // editUserSlice: (state, action) => {
    //   state = state.map((i) =>
    //     i.id == action.payload.id ? action.payload : i
    //   );
    //   return state;
    // },
    // deleteUserSlice: (state, action) => {
    //   state = state.filter((i) => i.id !== action.payload);
    //   return state;
    // },
  },
});
export const { searchUsersSlice } = search.actions;
export default search.reducer;
