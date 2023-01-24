import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchquantityDecrement = createAsyncThunk(   
    "quantityDecrement-Cart",
    async ({ payload, productID }, { rejectWithValue }) => {
        console.log("id:::::", payload,productID);
        try {
            const response = await api.actionHandler({
                url: api.quantityDecrementURL.replace("{id}", productID),
                method: "PATCH",

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

const quantityDecrementSlice = createSlice({
    name: "quantityDecrement-Cart",
    initialState: {
        quantityDecrementList: {},
        quantityDecrementFetching: false,
        quantityDecrementSuccess: false,
        quantityDecrementError: false,
        quantityDecrementErrorMessage: "",
    },
    reducers: {
        clearquantityDecrementState: (state) => {
            state.quantityDecrementError = false;
            state.quantityDecrementSuccess = false;
            state.quantityDecrementFetching = false;

            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchquantityDecrement.fulfilled, (state, {payload}) => {
            state.quantityDecrementList = payload.data
                    console.log("adc::", state.quantityDecrementList);
                state.quantityDecrementFetching = false;
                state.quantityDecrementSuccess = true;
                return state;
            }).addCase(fetchquantityDecrement.rejected, (state, action) => {
                state.quantityDecrementFetching = false;
                state.quantityDecrementError = true;
                state.quantityDecrementErrorMessage = action?.payload;
            }).addCase(fetchquantityDecrement.pending, (state) => {
                state.quantityDecrementFetching = true;
            });
    },
});

export const { clearquantityDecrementState } = quantityDecrementSlice.actions;

export default quantityDecrementSlice.reducer;
