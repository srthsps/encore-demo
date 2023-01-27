import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCartDelete = createAsyncThunk(
  'Cart-Delete',
  async ({ payload, productId }, { rejectWithValue }) => {
    try {
      const response = await api.actionHandler({
        url: api.cartDeleteURl.replace('{id}', productId),
        method: 'DELETE',
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

const CartDeleteSlice = createSlice({
  name: 'Cart-Delete',
  initialState: {
    brandCategoryList: [],
    CartDeleteFetching: false,
    CartDeleteSuccess: false,
    CartDeleteError: false,
    CartDeleteErrorMessage: '',
  },
  reducers: {
    clearCartDeleteState: (state) => {
      state.CartDeleteError = false
      state.CartDeleteSuccess = false
      state.CartDeleteFetching = false

      return state
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDelete.fulfilled, (state) => {
        state.CartDeleteFetching = false
        state.CartDeleteSuccess = true

        return state
      })
      .addCase(fetchCartDelete.rejected, (state, action) => {
        state.CartDeleteFetching = false
        state.CartDeleteError = true
        state.CartDeleteErrorMessage = action?.payload
      })
      .addCase(fetchCartDelete.pending, (state) => {
        state.CartDeleteFetching = true
      })
  },
})

export const { clearCartDeleteState } = CartDeleteSlice.actions

export default CartDeleteSlice.reducer
