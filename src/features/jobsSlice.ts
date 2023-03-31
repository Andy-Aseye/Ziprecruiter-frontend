import {createSlice} from "@reduxjs/toolkit";


interface Job {
    title: string| null;
    organization: string| null;
    description: string| null;
    salary: string|number| null;

}

interface JobState {
    job: Job | null;
}

const initialState: JobState = {
    job: {
        title: localStorage.getItem("title") ?? "",
        organization: localStorage.getItem("organization") ?? "",
        description: localStorage.getItem("description") ?? "",
        salary: localStorage.getItem("salary") ?? 0,
    }
}

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        selectedJob: (state, action) => {
            state.job = action.payload;
        },
    },
});


export const {selectedJob} = jobSlice.actions;
export default jobSlice.reducer;