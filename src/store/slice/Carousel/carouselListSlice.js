import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";

export const fetchcarouselList = createAsyncThunk(
    "carousel-list",
    async (payload, { rejectWithValue }) => {

        try {
            const response = await api.actionHandler({
                url: api.carouselListURL,
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
const carouselListSlice = createSlice({
    name: "carousel-list",
    initialState: {
        carouselList: [],
        carouselListFetching: false,
        carouselListSuccess: false,
        carouselListError: false,
        carouselListErrorMessage: "",
    },
    reducers: {
        fslClearState: (state) => {
            state.carouselListError = false;
            state.carouselListSuccess = false;
            state.carouselListFetching = false;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcarouselList.fulfilled, (state, action) => {

            state.carouselList = [];
            action.payload.data.results.forEach((item) => state.carouselList.push(item));

            state.carouselListFetching = false;
            state.carouselListSuccess = true;
            return state;


        }).addCase(fetchcarouselList.rejected, (state, action) => {

            state.carouselListFetching = false;
            state.carouselListError = true;
            state.carouselListErrorMessage = action?.payload;

        }).addCase(fetchcarouselList.pending, (state) => {
            state.carouselListFetching = true;

        })
    }

});

export const { carouselListClearState } = carouselListSlice.actions;

export default carouselListSlice.reducer;
