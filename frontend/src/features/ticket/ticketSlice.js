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

export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getAllTickets(token);
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
export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(token, ticketId);
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
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getAllTickets.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getTicket.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
