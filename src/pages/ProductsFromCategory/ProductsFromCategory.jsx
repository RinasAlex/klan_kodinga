import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsById } from "../../store/futures/categoriesSlice";

export default function ProductsFromCategory() {
  const dispatch = useDispatch();
  
  const { products} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsById());
      }, [products]);

  return (
    <div className="category">
      <div className="container">
        <div className="container__breadcrumbs">
          <Link to={`/`}>
            <button className="container__breadcrumbs__main-page-btn">
              Main page
            </button>
          </Link>
          <div className="container__line-position"></div>
          <Link to={`/categories`}>
            <button className="container__breadcrumbs__categories-btn">
              Categories
            </button>
          </Link>
          <div className="container__line-position-2"></div>
          <Link to={`/categories/${categoryId}`}>
            <button className="container__breadcrumbs__tools-btn">
              Tools and equipment
            </button>
          </Link>
        </div>
        <h2 className="container__title">Tools and equipment</h2>
        <div className="container__sort">Price, discounted items, sorted</div>
        <div className="container__items">
          {categoriesState.map((product) => (
            <CategoryCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
