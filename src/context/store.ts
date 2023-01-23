import {createSlice,SliceCaseReducers, configureStore } from "@reduxjs/toolkit";
import Header from "../components/layouts/headers/Header";
export const viewSlice =
  createSlice<any[],SliceCaseReducers<any[]>,string>({
    name: "dialog",
    initialState: [],
    reducers: {
      add: (state) => [...state, Header],
      remove: (state) => state.slice(0, state.length - 1),
    },
  });

export const viewStore = configureStore({
  reducer: () => viewSlice.reducer,
});
