import React, { useContext, useEffect } from "react";
import "./Categories.scss";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/store/futures/categoriesSlice";

const Categories = () => {
  const dispatch = useDispatch(); // отправляем действия (actions) в хранилище Redux
  const categoriesState = useSelector(
    //извлекаем данные из состояния хранилища
    (state) => state.categories.categoriesData
    //ф-ция (state) указывает useSelector, какую часть состояния нужно извлечь.
  );
  //отправляем действие для получения категорий при монтировании компонента
  useEffect(() => {
    dispatch(getCategories()); //функция
  }, [dispatch]); //масив

  return (
    <div className="categories">
      <div className="container">
        <h2 className="container__title">Categories</h2>

        <div className="container__line"></div>
        <Link to={`/categories`}>
          <button className="container__btn">All categories</button>
        </Link>
      </div>
      <div className="categories__list">
        {categoriesState.slice(0, 4).map((product) => (
          <CategoryCard key={product.id} {...product} />
        ))}
      </div>
      <Link to={`/categories`}>
        <button className="container__btn-2">All categories</button>
      </Link>
    </div>
  );
};

export default Categories;
