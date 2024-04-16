import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

axios.defaults.baseURL = "https://6618f1089a41b1b3dfbe61ce.mockapi.io/api/";

const REQUEST_OPTIONS = {
  page: 1,
  limit: 4,
};

export const signup = createAsyncThunk(
  "appState/signup",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/users", { ...user });
      if (response.status === 200) {
        Notify.success({ message: "Вітаємо з успішною реєстрацією" });
        return response.data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const signin = createAsyncThunk(
  "appState/signin",
  async (credentials, thunkAPI) => {
    try {
      const users = await axios.get("/users");
      if (users.status === 200) {
        const currentUser = users.data.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        if (currentUser) {
          localStorage.setItem("user", currentUser.id);
          return currentUser;
        } else {
          Notify.failure({ message: "Не вірний логін або пароль" });
        }
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  "appState/logout",
  async (_, thunkAPI) => {
    try {
      localStorage.clear();
      return null;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "appState/refresh",
  async (_, thunkAPI) => {
    try {
      const users = await axios.get("/users");
      const userId = JSON.parse(localStorage.getItem("user"));
      if (userId) {
        if (users.status === 200) {
          const currentUser = users.data.find(
            (user) => user.id === userId.toString()
          );
          return currentUser;
        }
      } else {
        return null;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "appState/updateUser",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.put(`/users/${newUser.id}`, { ...newUser });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "appState/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllCampers = createAsyncThunk(
  "appState/fetchAllCampers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/advert`);
      return response.data.length;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCampers = createAsyncThunk(
  "appState/fetchCampers",
  async (page, thunkAPI) => {
    REQUEST_OPTIONS.page = page;
    const options = new URLSearchParams(REQUEST_OPTIONS);
    try {
      const response = await axios.get(`/advert?${options}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
