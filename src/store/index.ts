import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { FC } from "react";
const initialState: FC<{ name?: string }>[] = []
export const viewSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    add(state, action: PayloadAction<FC<{ name?: string }>>) { state.push(action.payload) },
    remove(state) { state.pop() },
  },
});

export const viewStore = configureStore({
  reducer: {
    dialogs: viewSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
