import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

interface Job {
  id: string |null;
  title: string | null;
  description: string | null;
  skills: string | null;
  jobType: string | null;
  salary: string | null;

}

interface JobsListState {
  jobs: Job[];
}

const initialState: JobsListState = {
  jobs: [],
};

const jobsListSlice = createSlice({
  name: "jobsList",
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});


export const { addJob, removeJob } =
  jobsListSlice.actions;

export default jobsListSlice.reducer;
