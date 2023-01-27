import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchquantityIncrement = createAsyncThunk(
  'quantityIncrement-Cart',
  async ({ payload, productID }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.quantityIncrementURL.replace('{id}', productID),
        method: 'PATCH',
      })

      let data = await response
      if (response.status === 200) {
        let sam = response.data
        return sam
      } else {
        return rejectWithValue(data)
      }
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString()

      return rejectWithValue(message)
    }
  },
)

const quantityIncrementSlice = createSlice({
  name: 'quantityIncrement-Cart',
  initialState: {
    quantityIncrementList: {},
    quantityIncrementFetching: false,
    quantityIncrementSuccess: false,
    quantityIncrementError: false,
    quantityIncrementErrorMessage: '',
  },
  reducers: {
    clearquantityIncrementState: (state) => {
      state.quantityIncrementError = false
      state.quantityIncrementSuccess = false
      state.quantityIncrementFetching = false

      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchquantityIncrement.fulfilled, (state, { payload }) => {
        state.quantityIncrementList = payload.data

        state.quantityIncrementFetching = false
        state.quantityIncrementSuccess = true
        return state
      })
      .addCase(fetchquantityIncrement.rejected, (state, action) => {
        state.quantityIncrementFetching = false
        state.quantityIncrementError = true
        state.quantityIncrementErrorMessage = action?.payload
      })
      .addCase(fetchquantityIncrement.pending, (state) => {
        state.quantityIncrementFetching = true
      })
  },
})

export const { clearquantityIncrementState } = quantityIncrementSlice.actions

export default quantityIncrementSlice.reducer
