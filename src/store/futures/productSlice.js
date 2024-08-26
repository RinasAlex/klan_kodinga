import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    const res = await fetch(
      `https://exam-server-5c4e.onrender.com/products/${productId}`
    );

    const data = await res.json();

    return data;
  }
);

const initialState = {
  products: [],
  cart: [],
  filteredProducts: [],
  product: null,
  loading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterSaleProducts: (state) => {
      state.filteredProducts = state.products.filter(
        (item) => item.discont_price != null
      );
    },

    incrementProduct: (state, action) => {
      const isUnique = state.cart.every((el) => action.payload.id !== el.id);
      if (isUnique) {
        state.cart.push({
          ...action.payload,
          count: 2,
          total_price: action.payload.price,
          discount_total_price: action.payload.discont_price,
        });
      } else {
        state.cart = state.cart.map((el) => {
          if (action.payload.id === el.id) {
            return {
              ...el,
              count: ++el.count,
              total_price: el.price * el.count,
              discount_total_price: el.discont_price * el.count,
            };
          }
          return el;
        });
      }
    },

    decrementProduct: (state, action) => {
      state.cart = state.cart.map((el) => {
        if (action.payload.id === el.id && el.count > 1) {
          return {
            ...el,
            count: el.count - 1,
            total_price: el.total_price - el.price,
            discount_total_price: el.discount_total_price - el.discont_price,
          };
        }
        return el;
      });
    },

    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
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
      .addCase(fetchProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterSaleProducts, incrementProduct, decrementProduct } =
  productSlice.actions;

export default productSlice.reducer;
