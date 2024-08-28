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
      state.filteredProducts = state.products.filter((item) => item.discont_price != null);
    },

    filterSaleProducts: (state, { payload }) => {

      if (payload.value) {
        state.filteredProducts = [...state.products].filter((item) => item.discont_price != null);
      } else {
        state.filteredProducts = state.products;
      }
    },

    filterSaleProductsFavourite: (state, { payload }) => {

      if (payload.value) {
        state.filteredProducts = [...state.favourite].filter((item) => item.discont_price != null);
      } else {
        state.filteredProducts = state.favourite;
      }
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

    sortByFavourite: (state, { payload }) => {
      const data = state.filteredProducts.length > 0 ? state.filteredProducts : state.favourite;

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

    filterByPriceFavourite: (state, { payload }) => {
      const data = state.filteredProducts.length > 0 ? state.filteredProducts : state.favourite;

      const { minPrice, maxPrice } = payload;

      state.filteredProducts = data.filter(item => item.price >= minPrice && item.price <= maxPrice)
    },

    setFavourite: (state, { payload }) => {

      // 1. Проверяем есть ли товар в избранном
      if (state.favourite.find(item => item.id === payload)) {

        // 2. Если есть, то удаляем его
        state.favourite = state.favourite.filter(item => item.id !== payload);
      } else {
        // 3. Если нет, то добавляем
        let foundFavourite = state.products.find(item => item.id === payload);

        // 4. Добавляем товар в избранное
        state.favourite.push(foundFavourite)
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
      });
  },
});

export const {
  filterSaleProductsForPage,
  filterSaleProducts,
  filterSaleProductsFavourite,
  sortBy,
  sortByFavourite,
  filterByPrice,
  filterByPriceFavourite,
  setFavourite,
  getFavouriteFromLocalStorage,
  incrementProduct,
  decrementProduct
} = productSlice.actions;

export default productSlice.reducer;