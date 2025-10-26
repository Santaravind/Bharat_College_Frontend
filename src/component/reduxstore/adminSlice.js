import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    email: '',
    isAuthenticated: false
  },
  reducers: {
    setAdminEmail: (state, action) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    clearAdminEmail: (state) => {
      state.email = '';
      state.isAuthenticated = false;
    }
  }
});

export const { setAdminEmail, clearAdminEmail } = adminSlice.actions;
export default adminSlice.reducer;