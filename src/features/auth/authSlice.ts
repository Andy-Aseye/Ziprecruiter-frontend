import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  email: string | null;
  userType: string | null;
}

const initialState: UserState = {
  token: null,
  email: null,
  userType: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
  },
});

export const { setToken, setEmail, setUserType } = userSlice.actions;
export default userSlice.reducer;
