import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateApi } from "@reduxjs/toolkit/dist/query";
import axios from "axios";

const initialState = {
  status: "loading",
  searchList: [],
  error: null,
};

export const searchArtisan = createAsyncThunk(
  "artisan/searchArtisan",
  async ({profession,location} ) => {
    let url = `http://localhost:3600/artisans?profession_like=${profession}&address_like=${location}`;
    console.log(url);
    const response = await axios.get(url);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchArtisan.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchArtisan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchList = action.payload;
      })
      .addCase(searchArtisan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSearchStatus = (state) => state.searchSlice.status;
export const selectSearchList = (state) => state.searchSlice.searchList;
export const selectSearchError = (state) => state.searchSlice.error;

export default searchSlice.reducer;
