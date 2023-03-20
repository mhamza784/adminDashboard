import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    chat: [],
  },
  reducers: {
    getChatSlice: (state, action) => {
      return { ...state, chat: action.payload };
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
export const { getChatSlice, deleteBlockListSlice } = chat.actions;
export default chat.reducer;
