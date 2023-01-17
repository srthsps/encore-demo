import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchbrandList = createAsyncThunk(
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
const brandListSlice = createSlice({
    name: "brand-list",
    initialState: {
        brandList: [],
        brandListFetching: false,
        brandListSuccess: false,
        brandListError: false,
        brandListErrorMessage: "",
    },
    reducers: {
        fslClearState: (state) => {
            state.brandListError = false;
            state.brandListSuccess = false;
            state.brandListFetching = false;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchbrandList.fulfilled, (state, action) => {

            state.brandList = [];
            action.payload.data.results.forEach((item) => state.brandList.push(item));

            state.brandListFetching = false;
            state.brandListSuccess = true;
            return state;


        }).addCase(fetchbrandList.rejected, (state, action) => {

            state.brandListFetching = false;
            state.brandListError = true;
            state.brandListErrorMessage = action?.payload;

        }).addCase(fetchbrandList.pending, (state) => {
            state.brandListFetching = true;

        })
    }

});

export const { brandListClearState } = brandListSlice.actions;

export default brandListSlice.reducer;
