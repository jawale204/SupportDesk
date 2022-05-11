import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "autn/register",
  async (data, thunkAPI) => {
    console.log(data);
  },
);

export const login = createAsyncThunk("autn/login", async (data, thunkAPI) => {
  console.log(data);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
