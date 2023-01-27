import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchAllBrandList = createAsyncThunk(
  "all-brand-list",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.AllBrandListURl,
        method: "GET",
      });

      let data = await response;
      if (response.status === 200) {
        let sam = response.data;
        return sam;
      } else {
        return rejectWithValue(data);
      }
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return rejectWithValue(message);
    }
  }
);
const allBrandListSlice = createSlice({
  name: "all-brand-list",
  initialState: {
    allBrandList: [],
    allBrandListFetching: false,
    allBrandListSuccess: false,
    allBrandListError: false,
    allBrandListErrorMessage: "",
  },
  reducers: {
    fslClearState: (state) => {
      state.allBrandListError = false;
      state.allBrandListSuccess = false;
      state.allBrandListFetching = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBrandList.fulfilled, (state, action) => {
        state.allBrandList = [];
        action.payload.data.results.forEach((item) =>
          state.allBrandList.push(item)
        );

        state.allBrandListFetching = false;
        state.allBrandListSuccess = true;
        return state;
      })
      .addCase(fetchAllBrandList.rejected, (state, action) => {
        state.allBrandListFetching = false;
        state.allBrandListError = true;
        state.allBrandListErrorMessage = action?.payload;
      })
      .addCase(fetchAllBrandList.pending, (state) => {
        state.allBrandListFetching = true;
      });
  },
});

export const { allBrandListClearState } = allBrandListSlice.actions;

export default allBrandListSlice.reducer;
