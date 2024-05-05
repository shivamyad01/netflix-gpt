import { configureStore } from '@reduxjs/toolkit';

import userReducr  from "./userSlice" 
const appStore = configureStore({
  reducer: {
    user:userReducr,
  }
});

export default appStore;