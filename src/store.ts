import { configureStore } from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";
import rootReducer from "./features/rootReducer";


export const store = configureStore({
  reducer: rootReducer,
})

export const persitor = persistStore(store);
// export default store;