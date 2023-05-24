import { createSlice } from '@reduxjs/toolkit';

const AlertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    type: '',
    status: false,
    loginError: null,
    singleUser: {}
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
    getLoginError: (state, action) => {
      return { ...state, loginError: action.payload };
    },
    singleUser: (state, action) => {
      return {
        ...state,
        singleUser: action.payload,
      };
    },
  },
});
export const { createAlert, getLoginError, singleUser } = AlertSlice.actions;
export default AlertSlice.reducer;
