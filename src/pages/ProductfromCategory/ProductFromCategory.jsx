import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesById } from "../../store/futures/categoriesSlice";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filtration from "../../components/Filtration/Filtration";
// import "./ProductsFromCategory.scss";

export default function ProductsFromCategory() {
  const dispatch = useDispatch();
  const { filterProductsData } = useSelector((state) => state.categories);
  
  const { categoryId } = useParams();

  
  useEffect(() => {
    dispatch(fetchCategoriesById(categoryId));
  }, [ dispatch, categoryId]);

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
        <Filtration disabledDiscount={false} categoriesFilter={false}/>

        <div className="container__items">
          {filterProductsData &&  
            filterProductsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}