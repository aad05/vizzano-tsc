import { configureStore } from "@reduxjs/toolkit";
import countWorkSlice from "./countWorkSlice";
import otkSlice from "./otkSlice";
import storeSlice from "./storeSlice";

const store = configureStore({
  reducer: {
    countWork: countWorkSlice,
    otk: otkSlice,
    store: storeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
