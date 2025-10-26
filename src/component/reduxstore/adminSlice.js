
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    email: '',
    password: '',
    isAuthenticated: false,
  },
  reducers: {
    setAdminEmail: (state, action) => {
      state.email = action.payload;
      state.isAuthenticated = true; // Make sure this line is present
    },
    setAdminPassword: (state, action) => {
      state.password = action.payload;
    },
    clearAdmin: (state) => {
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminEmail, setAdminPassword, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;