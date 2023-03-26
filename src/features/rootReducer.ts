import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
