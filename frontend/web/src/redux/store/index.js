import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import todoReducerSlider from "../reducer/todoReducerSlider";
import userSlider from "../reducer/userSlider";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  todo: todoReducerSlider,
  user: userSlider,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
