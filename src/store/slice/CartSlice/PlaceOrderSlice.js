import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchPlaceOrder = createAsyncThunk(
    "PlaceOrder-Cart",
    async ({ customer,address,total_price,date_created }, { rejectWithValue }) => {
    
        try {
            const response = await api.actionHandler({
                url: api.placeOrderURL,
                method: "POST",
                data: {customer,address,total_price}


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

const PlaceOrderSlice = createSlice({
    name: "PlaceOrder-Cart",
    initialState: {
        PlaceOrderList: [],
        PlaceOrderFetching: false,
        PlaceOrderSuccess: false,
        PlaceOrderError: false,
        PlaceOrderErrorMessage: "",
    },
    reducers: {
        clearPlaceOrderState: (state) => {
            state.PlaceOrderError = false;
            state.PlaceOrderSuccess = false;
            state.PlaceOrderFetching = false;

            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPlaceOrder.fulfilled, (state, action) => {
                action.payload.data.results.forEach((items) => {
                    state.PlaceOrderList.push(items);
                });
                   
                state.PlaceOrderFetching = false;
                state.PlaceOrderSuccess = true;
                return state;
            }).addCase(fetchPlaceOrder.rejected, (state, action) => {
                state.PlaceOrderFetching = false;
                state.PlaceOrderError = true;
                state.PlaceOrderErrorMessage = action?.payload;
            }).addCase(fetchPlaceOrder.pending, (state) => {
                state.PlaceOrderFetching = true;
            });
    },
});

export const { clearPlaceOrderState } = PlaceOrderSlice.actions;

export default PlaceOrderSlice.reducer;
