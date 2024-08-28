import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesById } from "@/store/futures/categoriesSlice";
import { Link, useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard/ProductCard";
import "./ProductsFromCategory.scss";
import SmallButton from "@/components/Button/SmallButton";
import Filtration from "@/components/Filtration/Filtration";
import { categoriesFilterByPrice, categoriesFilterSale, categoriesSortBy } from "@/store/futures/categoriesSlice";


export default function ProductsFromCategory() {
  const dispatch = useDispatch();
  const { category, products, filterProductsData } = useSelector((state) => state.categories);
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategoriesById(categoryId));
  }, [dispatch, categoryId]);


  const data = filterProductsData.length > 0 ? filterProductsData : products;
 
  return (
    <div className="category">
      <div className="container">
        <div className="container__breadcrumbs">
          <Link to={`/`}>
            <SmallButton className="primary">Main page</SmallButton>
          </Link>
          <div className="container__breadcrumbs__line"></div>
          <Link to={`/categories`}>
            <SmallButton className="primary">Categories</SmallButton>
          </Link>
          <div className="container__breadcrumbs__line"></div>

          <Link to={`/categories/${categoryId}`}>
            <SmallButton className="secondary-active">
              {category?.title}
            </SmallButton>
          </Link>
        </div>
        <h2 className="container__title">{category?.title}</h2>

        <Filtration
          filterByPrice={categoriesFilterByPrice}   
          sortBy={categoriesSortBy}
          filterSale={categoriesFilterSale}
        /> 

        <div className="container__items">
          {data &&
            data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
