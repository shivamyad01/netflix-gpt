// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      // Since you're not using the action payload here, you can safely remove it
      return null;
    }
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
