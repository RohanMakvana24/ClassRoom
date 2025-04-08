import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import classSlice from "../../features/class/ClassSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classSlice,
  },
});
