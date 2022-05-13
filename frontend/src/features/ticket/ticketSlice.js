import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: {},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
