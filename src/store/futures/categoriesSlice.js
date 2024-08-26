import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categoriesData: [],
  status: "",
  categories: null,
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState, //начальное состояние
  reducers: {}, //пустой объект

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
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
