import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchBrandCategoryProducts = createAsyncThunk(
  "Brand-category",
  async ({ payload, brandID }, { rejectWithValue }) => {
    
    try {
      const response = await api.actionHandler({
        url: api.brandProductsListURl.replace("{id}", brandID),
        method: "GET",
        data: payload,

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

const BrandCategoryList = createSlice({
  name: "Brand-category",
  initialState: {
    brandCategoryList: [],
    BrandCategoryProductsFetching: false,
    BrandCategoryProductsSuccess: false,
    BrandCategoryProductsError: false,
    BrandCategoryProductsErrorMessage: "",
  },
  reducers: {
    clearBrandCategoryProductsState: (state) => {
      state.BrandCategoryProductsError = false;
      state.BrandCategoryProductsSuccess = false;
      state.BrandCategoryProductsFetching = false;

      return state;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandCategoryProducts.fulfilled, (state, action) => {
        state.brandCategoryList = [];
        action.payload.data.results.forEach((items) => {
          state.brandCategoryList.push(items);
        });
        state.BrandCategoryProductsFetching = false;
        state.BrandCategoryProductsSuccess = true;
       
        return state;
      })
      .addCase(fetchBrandCategoryProducts.rejected, (state, action) => {
        state.BrandCategoryProductsFetching = false;
        state.BrandCategoryProductsError = true;
        state.BrandCategoryProductsErrorMessage = action?.payload;
      })
      .addCase(fetchBrandCategoryProducts.pending, (state) => {
        state.BrandCategoryProductsFetching = true;
      });
  },
});

export const { clearBrandCategoryProductsState } = BrandCategoryList.actions;

export default BrandCategoryList.reducer;
