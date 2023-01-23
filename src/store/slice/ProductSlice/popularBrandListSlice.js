import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchpopularpopularBrand = createAsyncThunk(
    "brand-list",
    async (payload, { rejectWithValue }) => {

        try {
            const response = await api.actionHandler({
                url: api.popularBrandListURl,
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
const popularpopularBrandSlice = createSlice({
    name: "brand-list",
    initialState: {
        popularBrand: [],
        popularBrandFetching: false,
        popularBrandSuccess: false,
        popularBrandError: false,
        popularBrandErrorMessage: "",
    },
    reducers: {
        fslClearState: (state) => {
            state.popularBrandError = false;
            state.popularBrandSuccess = false;
            state.popularBrandFetching = false;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchpopularpopularBrand.fulfilled, (state, action) => {

            state.popularBrand = [];
            action.payload.data.results.forEach((item) => state.popularBrand.push(item));

            state.popularBrandFetching = false;
            state.popularBrandSuccess = true;
            return state;


        }).addCase(fetchpopularpopularBrand.rejected, (state, action) => {

            state.popularBrandFetching = false;
            state.popularBrandError = true;
            state.popularBrandErrorMessage = action?.payload;

        }).addCase(fetchpopularpopularBrand.pending, (state) => {
            state.popularBrandFetching = true;

        })
    }

});

export const { popularBrandClearState } = popularpopularBrandSlice.actions;

export default popularpopularBrandSlice.reducer;
