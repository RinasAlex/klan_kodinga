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
  filteredAllProducts: [],
  filteredProductsFavourite: [],
  favourite: [],
  product: null,
  loading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterSaleProductsForPage: (state) => {
      state.filteredProducts = state.products.filter(
        (item) => item.discont_price != null
      );
    },

    filterSaleProducts: (state, { payload }) => {
      if (payload.value) {
        state.filteredAllProducts =  [...state.products].filter(
          (item) => item.discont_price != null
        );
      } else {
        state.filteredAllProducts = state.products;
      }
    },

    filterSaleProductsFavourite: (state, { payload }) => {
      if (payload.value) {
        state.filteredProductsFavourite = [...state.favourite].filter(
          (item) => item.discont_price != null
        );
      } else {
        state.filteredProductsFavourite = state.favourite;
      }
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
            count: payload.count,
            total_price: payload.product.price * payload.count,
            discount_total_price: payload.product.discont_price * payload.count,
          });
        } else {
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state, action) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    sortBySale: (state, { payload }) => {
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

    sortByAllProducts: (state, { payload }) => {
      const data =
        state.filteredAllProducts.length > 0
          ? state.filteredAllProducts
          : state.products;

      if (payload.value === "price-low-high") {
        state.filteredAllProducts = [...data].sort((a, b) => a.price - b.price);
      } else if (payload.value === "price-high-low") {
        state.filteredAllProducts = [...data].sort((a, b) => b.price - a.price);
      } else {
        state.filteredAllProducts = [...data].sort((a, b) => a.id - b.id);
      }
    },

    sortByFavourite: (state, { payload }) => {
      const data =
        state.filteredProductsFavourite.length > 0
          ? state.filteredProductsFavourite
          : state.favourite;

      if (payload.value === "price-low-high") {
        state.filteredProductsFavourite = [...data].sort(
          (a, b) => a.price - b.price
        );
      } else if (payload.value === "price-high-low") {
        state.filteredProductsFavourite = [...data].sort(
          (a, b) => b.price - a.price
        );
      } else {
        state.filteredProductsFavourite = [...data].sort((a, b) => a.id - b.id);
      }
    },

    filterByPriceSale: (state, { payload }) => {
      const data =
        state.filteredProducts.length > 0
          ? state.filteredProducts
          : state.products;

      const { minPrice, maxPrice } = payload;

      state.filteredProducts = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    filterByPriceAllProducts: (state, { payload }) => {
      const data =
        state.filteredAllProducts.length > 0
          ? state.filteredAllProducts
          : state.products;

      const { minPrice, maxPrice } = payload;

      state.filteredAllProducts = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    filterByPriceFavourite: (state, { payload }) => {
      const data =
        state.filteredProductsFavourite.length > 0
          ? state.filteredProductsFavourite
          : state.favourite;

      const { minPrice, maxPrice } = payload;

      state.filteredProductsFavourite = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    filterByPriceAllProducts: (state, { payload }) => {
      const data =
        state.filteredAllProducts.length > 0
          ? state.filteredAllProducts
          : state.products;

      const { minPrice, maxPrice } = payload;

      state.filteredAllProducts = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    filterByPriceFavourite: (state, { payload }) => {
      const data =
        state.filteredProductsFavourite.length > 0
          ? state.filteredProductsFavourite
          : state.favourite;

      const { minPrice, maxPrice } = payload;

      state.filteredProductsFavourite = data.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    },

    setFavourite: (state, { payload }) => {
      // 1. Проверяем есть ли товар в избранном
      if (state.favourite.find((item) => item.id === payload)) {
        // 2. Если есть, то удаляем его
        state.favourite = state.favourite.filter((item) => item.id !== payload);

        // 2. Если есть, то удаляем его
        state.filteredProductsFavourite =
          state.filteredProductsFavourite.filter((item) => item.id !== payload);
      } else {
        // 3. Если нет, то добавляем
        let foundFavourite = state.products.find((item) => item.id === payload);

        // 4. Добавляем товар в избранное
        state.favourite.push(foundFavourite);
      }

      localStorage.setItem("favourite", JSON.stringify(state.favourite));
    },

    getFavouriteFromLocalStorage: (state) => {
      let favouriteStorage = JSON.parse(localStorage.getItem("favourite"));

      favouriteStorage =
        favouriteStorage?.length > 0 && favouriteStorage.filter((item) => item);

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
        state.product = action.payload[0];
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
  filterSaleProductsForPage,
  filterSaleProducts,
  filterSaleProductsFavourite,
  sortBySale,
  sortByAllProducts,
  sortByFavourite,
  filterByPriceSale,
  filterByPriceAllProducts,
  filterByPriceFavourite,
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
