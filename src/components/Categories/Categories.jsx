import React from "react";
import "./Categories.scss";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const Categories = () => {
    const categoriesState = useSelector(
    //извлекаем данные из состояния хранилища
    (state) => state.categories.categoriesData
    //ф-ция (state) указывает useSelector, какую часть состояния нужно извлечь.
  );
  //отправляем действие для получения категорий при монтировании компонента
  
  return (
    <div className="categories">
      <div className="container">
        <div className="container__position">
          <h2 className="container__title">Categories</h2>
          <div className="container__line"></div>
          <Link to={`/categories`}>
            <button className="container__btn">All categories</button>
          </Link>
        </div>

        <div className="container__list">
          {categoriesState.slice(0, 4).map((product) => (
            <CategoryCard key={product.id} {...product} />
          ))}
        </div>
        <div className="container__btn-2-position">
          <Link to={`/categories`}>
            <button className="container__btn-2">All categories</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
