import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import AllSalesPage from "./pages/AllSalesPage/AllSalesPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/futures/productSlice";

const App = () => {
// const dispatch = useDispatch();
// const {loading} = useSelector(state => state.products) 

// useEffect(() => {
//   dispatch(getProducts())
// }, [dispatch])

// if(loading){
//   return "Loading ...."
// }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<MainPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
