import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./futures/productSlice";
import categoriesSlice from "./futures/categoriesSlice";

 export const store = configureStore({
    reducer: {
        products: productSlice,
        categories: categoriesSlice
    }
 })