import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6618f1089a41b1b3dfbe61ce.mockapi.io/api/';

export const register = createAsyncThunk(
  'appState/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/users', { ...user });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

  