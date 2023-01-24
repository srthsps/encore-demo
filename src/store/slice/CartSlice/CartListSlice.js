import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchcartList = createAsyncThunk(
    "cart-list",
    async (payload, { rejectWithValue }) => {

        try {
            const response = await api.actionHandler({
                url: api.cartListURl,
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
const cartListSlice = createSlice({
    name: "cart-list",
    initialState: {
        cartList: [],
        cartItems: [],
        cartListFetching: false,
        cartListSuccess: false,
        cartListError: false,
        cartListErrorMessage: "",
    },
    reducers: {
        fslClearState: (state) => {
            state.cartListError = false;
            state.cartListSuccess = false;
            state.cartListFetching = false;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcartList.fulfilled, (state, action) => {
            state.cartList = action.payload.data;
            state.cartItems = action.payload.data.results;
            // action.payload.data.results.forEach((item) => state.cartItems.push(item));

            console.log("cart-list ::: ", state.cartItems);

            state.cartListFetching = false;
            state.cartListSuccess = true;
            return state;


        }).addCase(fetchcartList.rejected, (state, action) => {

            state.cartListFetching = false;
            state.cartListError = true;
            state.cartListErrorMessage = action?.payload;

        }).addCase(fetchcartList.pending, (state) => {
            state.cartListFetching = true;

        })
    }

});

export const { cartListClearState } = cartListSlice.actions;

export default cartListSlice.reducer;
