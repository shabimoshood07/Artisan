import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { CreateApi } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import { selectUsertoken } from "../authSlice/authSlice";
import { useSelector } from "react-redux";

const searchAdapter = createEntityAdapter({
  selectId: (artisan) => artisan._id,
  sortComparer: null,
});

const initialState = searchAdapter.getInitialState({
  status: "idle",
  error: null,
  currentPage: 0,
  numberOfPages: 0,
});

// const token = useSelector(selectUsertoken);
export const searchArtisan = createAsyncThunk(
  "artisan/searchArtisan",
  async ({ profession, location, page }, { getState }) => {
    let url = `http://localhost:5000/artisan/search?location=${location}&profession=${profession}&page=${Number(
      page
    )}`;
    // console.log(url);
    const token = getState().authSlice.userCredentials.token;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
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
        console.log(action.payload);
        searchAdapter.setAll(state, action.payload.artisans);
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(searchArtisan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllArtisan,
  selectById: selectArtisanById,
  selectIds: selectArtisanIds,
} = searchAdapter.getSelectors((state) => state.searchSlice);

export const selectIds = searchAdapter.getSelectors((state) => {
  return state.searchSlice._id;
});

export const selectSearchStatus = (state) => state.searchSlice.status;
export const selectSearchError = (state) => state.searchSlice.error;

export const selectCurrentPage = (state) => state.searchSlice.currentPage;
export const selectNumberOfPage = (state) => state.searchSlice.numberOfPages;

export default searchSlice.reducer;
