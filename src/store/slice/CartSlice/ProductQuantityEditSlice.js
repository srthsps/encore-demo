import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchProductQuantity = createAsyncThunk(   
    "ProductQuantity-Cart",
    async ({ payload, productID }, { rejectWithValue }) => {
        console.log("id:::::", payload,productID);
        try {
            const response = await api.actionHandler({
                url: api.ProductQuantityURL.replace("{id}", productID),
                method: "PATCH",
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

const ProductQuantitySlice = createSlice({
    name: "ProductQuantity-Cart",
    initialState: {
        ProductQuantityList: [],
        ProductQuantityFetching: false,
        ProductQuantitySuccess: false,
        ProductQuantityError: false,
        ProductQuantityErrorMessage: "",
    },
    reducers: {
        clearProductQuantityState: (state) => {
            state.ProductQuantityError = false;
            state.ProductQuantitySuccess = false;
            state.ProductQuantityFetching = false;

            return state;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProductQuantity.fulfilled, (state, action) => {
                // action.payload.data.results.forEach((items) => {
                //     state.ProductQuantityList.push(items);
                // });
                    console.log("adc::", action.payload);
                state.ProductQuantityFetching = false;
                state.ProductQuantitySuccess = true;
                return state;
            }).addCase(fetchProductQuantity.rejected, (state, action) => {
                state.ProductQuantityFetching = false;
                state.ProductQuantityError = true;
                state.ProductQuantityErrorMessage = action?.payload;
            }).addCase(fetchProductQuantity.pending, (state) => {
                state.ProductQuantityFetching = true;
            });
    },
});

export const { clearProductQuantityState } = ProductQuantitySlice.actions;

export default ProductQuantitySlice.reducer;
