import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isSucces: false,
  isError: false,
  isLoading: false,
  message: "",
};

const getNotes = createAsyncThunk(
  "note/getNotes",
  async (tokenId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token, tokenId);
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
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isError = false;
        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
