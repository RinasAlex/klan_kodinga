import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "@/store/futures/categoriesSlice";
import CategoryCard from "@/components/Categories/CategoryCard";
import "./AllCategories.scss";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categoriesState = useSelector(
    //извлекаем данные из состояния хранилища
    (state) => state.categories.categoriesData
  );
  const status = useSelector((state) => state.categories.status === "loading");
  useEffect(() => {
    dispatch(getCategories()); //функция
  }, [dispatch]); //масив

  return (
    <div className="categories">
      <div className="content">
        <div className="content__position-btn">
          <Link to={`/`}>
            <button className="content__btn-1">Main page</button>
          </Link>
          <div className="content__line-position"></div>
          <Link to={`/categories`}>
            <button className="content__btn-2">Categories</button>
          </Link>
        </div>
        <h2 className="content__page-title">Categories</h2>
        <div className="content__list-img">
          {categoriesState.map((product) => (
            <CategoryCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
