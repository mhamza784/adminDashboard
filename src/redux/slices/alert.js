import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    type: "",
    status: false,
  },
  reducers: {
    createAlert: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        status: action.payload.status,
      };
    },
  },
});
export const { createAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
