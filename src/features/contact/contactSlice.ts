import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Contact } from "../../types";
import { fetchUsers } from "./ActionCreators";

export interface CounterState {
  value: Contact[];
  searchValues: Contact[];
  display: boolean;
  error: string;
  isLoading: boolean;
}

const initialState: CounterState = {
  value: [],
  error: "",
  isLoading: false,
  searchValues: [],
  display: false,
};

export const counterSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Contact>) => {
      state.value = state.value.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    undo: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
    search: (state, action: PayloadAction<string>) => {
      let result: Contact[] = [];
      state.searchValues = [];
      const val: string = action.payload.toLowerCase();
      for (let user of state.value) {
        const { name, phone } = user;
        if (
          name.toLowerCase().includes(val) ||
          phone.toLowerCase().includes(val)
        ) {
          result.push(user);
        }
      }
      state.searchValues.push(...result);
    },
    addItem: (state, action: PayloadAction<Contact>) => {
      state.value.push(action.payload);
    },
    setDisplay: (state) => {
      state.display = !state.display;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<Contact[]>) => {
      state.isLoading = false;
      state.error = "";
      state.value = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { undo, update, search, addItem, setDisplay } =
  counterSlice.actions;

export const users = (state: RootState) => state.users.value;
export const searching = (state: RootState) => state.users.searchValues;
export const formDisplay = (state: RootState) => state.users.display;
export const isLoading = (state: RootState) => state.users.isLoading;

export default counterSlice.reducer;
