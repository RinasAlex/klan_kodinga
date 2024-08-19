import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categoriesData: [],
  status: "",
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
      });
  },
});

export default categoriesSlice.reducer;
