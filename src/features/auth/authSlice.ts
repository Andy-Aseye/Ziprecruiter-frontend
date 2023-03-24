import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    type: string | null;
}

const initialState : AuthState = {
    token: null,
    type: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
    }
})

export const {setToken} = authSlice.actions;
export default authSlice.reducer;