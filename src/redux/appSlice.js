import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  logout,
  refresh,
  updateUser,
  fetchUsers,
  fetchCampers,
} from "./operations";

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
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users.push({ ...action.payload });
      })
      .addCase(signup.rejected, handleRejected)

      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentUser = { ...action.payload };
        state.isLoggedIn = true;
      })
      .addCase(signin.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentUser = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(refresh.pending, handlePending)
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        action.payload === null
          ? (state.currentUser = null)
          : (state.currentUser = { ...action.payload });
        action.payload === null
          ? (state.isLoggedIn = false)
          : (state.isLoggedIn = true);
      })

      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users.splice(index, 1, {...action.payload});
        state.currentUser = { ...action.payload };
        state.isLoggedIn = true;
      })
      .addCase(updateUser.rejected, handleRejected)

      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.users = [...action.payload];
      })
      .addCase(fetchUsers.rejected, handleRejected)

      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.campers = [...action.payload];
      })
      .addCase(fetchCampers.rejected, handleRejected);
  },
});

export const { filter } = appSlice.actions;
export const mainStateReducer = appSlice.reducer;
