import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Contact } from "../../types";

export interface CounterState {
  value: Contact[];
  searchValues: Contact[];
}

const initialState: CounterState = {
  value: [],
  searchValues: [],
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
    init: (state, action: PayloadAction<Contact[]>) => {
      let result: Contact[] = [];
      state.value = [];
      for (let user of action.payload) {
        const { name, phone, id } = user;
        result.push({ name: name, phone: phone, id: id, photo: "" });
      }
      state.value.push(...result);
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
  },
});

export const { undo, update, init, search, addItem } = counterSlice.actions;

export const users = (state: RootState) => state.users.value;
export const searching = (state: RootState) => state.users.searchValues;

export default counterSlice.reducer;
