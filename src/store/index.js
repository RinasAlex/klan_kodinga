import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./futures/productSlice";

 export const store = configureStore({
    reducer: {
        products: productSlice
    }
 })