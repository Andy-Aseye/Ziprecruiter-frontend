import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import userSlice from "./features/userSlice";
import jobSlice from "./features/jobsSlice";
import jobsListSlice  from "./features/jobsListsSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
    job: jobSlice,
    joblist: jobsListSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;