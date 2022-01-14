import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../features/contact/contactSlice";
import searchValuesReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    searchValues: searchValuesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
