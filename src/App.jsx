import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainPage from "./pages/MainPage/MainPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import AllSalesPage from "./pages/AllSalesPage/AllSalesPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import { useDispatch } from "react-redux";
import {
  getCartFromLocalStorage,
  getFavouriteFromLocalStorage,
  getProducts,
} from "./store/futures/productSlice";
import { getCategories } from "./store/futures/categoriesSlice";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsFromCategory from "./pages/ProductsFromCategory/ProductsFromCategory";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CartPageEmpty from "./pages/CartPage/CartPageEmpty";
import PageNotFound from "./pages/ErrorPage/PageNotFound";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
    dispatch(getFavouriteFromLocalStorage());
    dispatch(getCartFromLocalStorage());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<MainPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/productPage/:id" element={<ProductPage />} />
          <Route
            path="/categories/:categoryId"
            element={<ProductsFromCategory />}
          />
          <Route path="/favourites" element={<FavoritesPage />} />
          <Route path="/cartEmpty" element={<CartPageEmpty />} />
          <Route path="*" element={<PageNotFound />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
