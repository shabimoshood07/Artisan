import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { CreateApi } from "@reduxjs/toolkit/dist/query";
import axios from "axios";

const searchAdapter = createEntityAdapter({
  selectId: (artisan) => artisan._id,
  sortComparer: null,
});

const initialState = searchAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const searchArtisan = createAsyncThunk(
  "artisan/searchArtisan",
  async ({ profession, location }) => {
    let url = `http://localhost:5000/artisan/search?location=${location}&profession=${profession}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
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
        searchAdapter.setAll(state, action.payload);
        // searchAdapter.upsertMany(state, action.payload);
      })
      .addCase(searchArtisan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllArtisan,
  selectById: selectArtisanById,
  selectIds: selectArtisanIds,
  // Pass in a selector that returns the posts slice of state
} = searchAdapter.getSelectors((state) => state.searchSlice);

// The `selectId` implementation: function (instance) {
//         return instance.id;
//       }
export const selectIds = searchAdapter.getSelectors((state) => {
  return state.searchSlice._id;
});

// export const selectIds = (art)=>{
//   searchAdapter.getSelectors((state) => state.searchSlice)
//   return art._id
// }

// export const sele = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.user === userId)
// );

export const selectSearchStatus = (state) => state.searchSlice.status;
export const selectSearchError = (state) => state.searchSlice.error;

export default searchSlice.reducer;
