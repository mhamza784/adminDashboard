import { createSlice } from "@reduxjs/toolkit";

const hotList = createSlice({
  name: "hotList",
  initialState: {
    hotListByYou: [],
    hotListYou: [],
  },
  reducers: {
    getAllHotSlice: (state, action) => {
      return { ...state, hotListYou: action.payload };
    },

    // editUserSlice: (state, action) => {
    //   state = state.map((i) =>
    //     i.id == action.payload.id ? action.payload : i
    //   );
    //   return state;
    // },
    deleteHotListSlice: (state, action) => {
      state = state.filter((i) => i.id !== action.payload);
      return state;
    },
  },
});
export const { getAllHotSlice, deleteHotListSlice } = hotList.actions;
export default hotList.reducer;
