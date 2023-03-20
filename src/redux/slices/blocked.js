import { createSlice } from "@reduxjs/toolkit";

const blockList = createSlice({
  name: "BlockList",
  initialState: {
    Blocked: [],
  },
  reducers: {
    getAllBlockedSlice: (state, action) => {
      return { ...state, Blocked: action.payload };
    },

    // editUserSlice: (state, action) => {
    //   state = state.map((i) =>
    //     i.id == action.payload.id ? action.payload : i
    //   );
    //   return state;
    // },
    deleteBlockListSlice: (state, action) => {
      state = state.filter((i) => i.id !== action.payload);
      return state;
    },
  },
});
export const { getAllBlockedSlice, deleteBlockListSlice } = blockList.actions;
export default blockList.reducer;
