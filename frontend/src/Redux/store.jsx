import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;