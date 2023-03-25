import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // ... other reducers
  },
});

export default store;
