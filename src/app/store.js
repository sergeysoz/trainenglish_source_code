import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../features/entry/entrySlice";
import trainReducer from "../features/train/trainSlice";

export const store = configureStore({
  reducer: {
    entry: entryReducer,
    train: trainReducer,
  },
});
