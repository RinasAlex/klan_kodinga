import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await fetch(
      `https://exam-server-5c4e.onrender.com/products/all`
    );

    const data = await res.json();

    return data;
  }
);

export const fetchProductsById = createAsyncThunk(
  "products/fetchProductsById",
  async (productId) => {
    const res = await fetch(`https://exam-server-5c4e.onrender.com/products/${productId}`);

    const data = await res.json();

    return data;
  }
)


const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
  loading: false,
  error: ''
  
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterSaleProducts: (state) => {
      state.filteredProducts = state.products.filter(item => item.discont_price != null)
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
})

export const {
  filterSaleProducts
} = productSlice.actions

export default productSlice.reducer
