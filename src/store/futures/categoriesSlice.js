import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categoriesData: [],
  filterProductsData: [],
  status: "",
  category: null,
  products: [],
  loading: false,
  error: "",
};
//выполняем запрос к серверу для получения всех категорий и  возвращает данные,
//с помощью AsyncThunk
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await fetch(
      "https://exam-server-5c4e.onrender.com/categories/all"
    );
    const data = res.json(); //создали новый Response объект
    return data;
  }
);

export const fetchCategoriesById = createAsyncThunk(
  "categories/fetchCategoriesById",
  async (categoriesId) => {
    const res = await fetch(
      `https://exam-server-5c4e.onrender.com/categories/${categoriesId}`
    );

    const data = await res.json();

    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState, //начальное состояние
  reducers: {
    categoriesSortBy: (state, { payload }) => {
      const data = state.filterProductsData.length > 0 ? state.filterProductsData : state.products;

      if (payload.value === "price-low-high") {
        state.filterProductsData = [...data].sort((a, b) => a.price - b.price);
      } else if (payload.value === "price-high-low") {
        state.filterProductsData = [...data].sort((a, b) => b.price - a.price);
      } else {
        state.filterProductsData = [...data].sort((a, b) => a.id - b.id);
      }
    },

    categoriesFilterByPrice: (state, { payload }) => {
      const data = state.filterProductsData.length > 0 ? state.filterProductsData : state.products;

      const { minPrice, maxPrice } = payload;

      state.filterProductsData = data.filter(item => item.price >= minPrice && item.price <= maxPrice)
    },

    categoriesFilterSale: (state, { payload }) => {

      if (payload.value) {
        state.filterProductsData = [...state.products].filter((item) => item.discont_price != null);
      } else {
        state.filterProductsData = state.products;
      }

    },

  },

  //метод builder, добавляет обработчик для действия getCategories.pending.
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading"; //запрос находится в процессе выполнения
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categoriesData = action.payload;
        state.status = "ready";
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchCategoriesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.category;
        state.products = action.payload.data;
        state.filterProductsData = action.payload.data;
      })
      .addCase(fetchCategoriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  categoriesSortBy,
  categoriesFilterByPrice,
  categoriesFilterSale
} = categoriesSlice.actions;


export default categoriesSlice.reducer;