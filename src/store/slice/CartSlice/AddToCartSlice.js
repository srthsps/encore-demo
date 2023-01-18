import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchAddToCart = createAsyncThunk(
    "AddTo-Cart",
    async ({ payload }, { rejectWithValue }) => {
        console.log("id:::::", payload);
        try {
            const response = await api.actionHandler({
                url: api.AddToCartURL,
                method: "POST",
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

const AddToCartSlice = createSlice({
    name: "AddTo-Cart",
    initialState: {
        AddToCartList: [],
        AddToCartFetching: false,
        AddToCartSuccess: false,
        AddToCartError: false,
        AddToCartErrorMessage: "",
    },
    reducers: {
        clearAddToCartState: (state) => {
            state.AddToCartError = false;
            state.AddToCartSuccess = false;
            state.AddToCartFetching = false;

            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
                // action.payload.data.results.forEach((items) => {
                //     state.AddToCartList.push(items);
                // });
                    console.log("adc::", action.payload);
                state.AddToCartFetching = false;
                state.AddToCartSuccess = true;
                return state;
            }).addCase(fetchAddToCart.rejected, (state, action) => {
                state.AddToCartFetching = false;
                state.AddToCartError = true;
                state.AddToCartErrorMessage = action?.payload;
            }).addCase(fetchAddToCart.pending, (state) => {
                state.AddToCartFetching = true;
            });
    },
});

export const { clearAddToCartState } = AddToCartSlice.actions;

export default AddToCartSlice.reducer;
