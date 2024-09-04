import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendDiscount = createAsyncThunk("sale/send", async (userData) => {
  try {
    const res = await fetch(`https://exam-server-5c4e.onrender.com/sale/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const sendProducts = createAsyncThunk(
  "order/send",
  async (userProductsData) => {
    console.log("userProductsData", userProductsData);
    try {
      const res = await fetch(
        `https://exam-server-5c4e.onrender.com/order/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProductsData),
        }
      );

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
  favourite: [],
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

    addProduct: (state, { payload }) => {
      const isUnique = state.cart.every((el) => {
        if (payload.product) {
          return payload.product.id !== el.id;
        }
        return payload.id !== el.id;
      });
      if (isUnique) {
        if (payload.product) {
          state.cart.push({
            ...payload.product,
            count: payload.currentCount,
            total_price: payload.product.price * payload.currentCount,
            discount_total_price:
              payload.product.discont_price * payload.currentCount,
          });
        } else {
          console.log(payload.count);
          state.cart.push({
            ...payload,
            count: 1,
            total_price: payload.price,
            discount_total_price: payload.discont_price,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    getCartFromLocalStorage: (state, cart) => {
      let cartStorage = JSON.parse(localStorage.getItem("cart"));

      if (cartStorage) {
        state.cart = [...cartStorage];
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      console.log(cart);
    },

    incrementProduct: (state, action) => {
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    clearCart: (state, action) => {
      state.cart = [];
    },

    sortBy: (state, { payload }) => {
      const data =
        state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products;

      if (payload.value === "price-low-high") {
        state.filteredProducts = [...data].sort((a, b) => a.price - b.price);
      } else if (payload.value === "price-high-low") {
        state.filteredProducts = [...data].sort((a, b) => b.price - a.price);
      } else {
        state.filteredProducts = [...data].sort((a, b) => a.id - b.id);
      }
    },

    filterByPrice: (state, { payload }) => {
      const data =
        state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products;

      const { minPrice, maxPrice } = payload;

      state.filteredProducts = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    setFavourite: (state, { payload }) => {
      let foundFavourite = state.favourite.find((item) => item === payload);

      if (foundFavourite) {
        state.favourite = state.favourite.filter((item) => item !== payload);
      } else {
        state.favourite.push(payload);
      }

      localStorage.setItem("favourite", JSON.stringify(state.favourite));
    },

    getFavouriteFromLocalStorage: (state) => {
      let favouriteStorage = JSON.parse(localStorage.getItem("favourite"));

      if (favouriteStorage) {
        state.favourite = [...favouriteStorage];
      } else {
        localStorage.setItem("favourite", JSON.stringify([]));
      }
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
        state.sortedProducts = action.payload;
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
      })
      .addCase(sendProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(sendProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendDiscount.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(sendDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  filterSaleProducts,
  sortBy,
  filterByPrice,
  setFavourite,
  getCartFromLocalStorage,
  getFavouriteFromLocalStorage,
  incrementProduct,
  decrementProduct,
  removeProduct,
  addProduct,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;
