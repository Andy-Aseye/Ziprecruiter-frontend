import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface JobsState {
    jobs: any;
}

const jobsfinalState: JobsState = {
    jobs: 0,
};


// const jobsSlice = createSlice({
//     name: 'jobs',
//     initialState,
//     reducers: {
//         in
//     }
// })