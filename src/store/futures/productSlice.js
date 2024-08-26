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
  favourite: [],
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
    },

    sortBy: (state, { payload }) => {
      const data = state.filteredProducts.length > 0 ? state.filteredProducts : state.products;

      if (payload.value === "price-low-high") {
        state.filteredProducts = [...data].sort((a, b) => a.price - b.price);
      } else if (payload.value === "price-high-low") {
        state.filteredProducts = [...data].sort((a, b) => b.price - a.price);
      } else {
        state.filteredProducts = [...data].sort((a, b) => a.id - b.id);
      }
    },

    filterByPrice: (state, { payload }) => {
      const data = state.filteredProducts.length > 0 ? state.filteredProducts : state.products;

      const { minPrice, maxPrice } = payload;

      state.filteredProducts = data.filter(item => item.price >= minPrice && item.price <= maxPrice)
    },

    setFavourite: (state, { payload }) => {
      let foundFavourite = state.favourite.find(item => item === payload);

      if (foundFavourite) {
        state.favourite = state.favourite.filter(item => item !== payload);
      } else {
        state.favourite.push(payload)
      }

      localStorage.setItem("favourite", JSON.stringify(state.favourite))
    },



    getFavouriteFromLocalStorage: state => {
      let favouriteStorage = JSON.parse(localStorage.getItem("favourite"));

      if (favouriteStorage) {
        state.favourite = [...favouriteStorage];
      } else {
        localStorage.setItem("favourite", JSON.stringify([]))
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.sortedProducts = action.payload;
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
  filterSaleProducts,
  sortBy,
  filterByPrice,
  setFavourite,
  getFavouriteFromLocalStorage

} = productSlice.actions

export default productSlice.reducer