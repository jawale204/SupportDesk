import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";
const initialState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
};

export const createTicket = createAsyncThunk(
  "ticket/createNew",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      console.log(error);
      const message =
        error.response.data.message ||
        error.response.data.err.errors[0].msg ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  },
);
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createTicket.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
