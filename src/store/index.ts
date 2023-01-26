import { THeader } from "./../components/layouts/headers/Header";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
const initialState: THeader[] = [];
export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    add(state, action: PayloadAction<THeader>) {
      state.push(action.payload);
    },
    remove(state) {
      state.pop();
    },
  },
});

export const store = configureStore({
  reducer: {
    dialogs: dialogSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
