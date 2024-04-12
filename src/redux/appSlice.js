import { createSlice } from "@reduxjs/toolkit";
import {register} from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const appSlice = createSlice({
  name: "appState",
  initialState: {
    campers: [],
    users: [],
    filter: "",
    isLoading: false,
    error: null,
    currentUser: null,
    isLoggedIn: false,
  },
  reducers: {
    filter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = null;
        // state.contacts = [...action.payload];
      })
      .addCase(register.rejected, handleRejected);
  },
});

export const { filter } = appSlice.actions;
export const mainStateReducer = appSlice.reducer;
