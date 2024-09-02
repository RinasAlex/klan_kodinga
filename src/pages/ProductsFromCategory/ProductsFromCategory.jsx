import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesById } from "@/store/futures/categoriesSlice";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard/ProductCard";
import "./ProductsFromCategory.scss";
import Filtration from "@/components/Filtration/Filtration";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function ProductsFromCategory() {
  const dispatch = useDispatch();
  const { category, products } = useSelector((state) => state.categories);
  const { categoryId } = useParams();
  useEffect(() => {
    dispatch(fetchCategoriesById(categoryId));
  }, [dispatch, categoryId]);
  //dispatch  отправляет действия в хранилище Redux.
  const breadcrumbs = [
    {
      //Свойство label задает текст
      label: "Main page",
      link: "/",
    },
    {
      label: "Categories",
      link: "/categories",
    },
    {
     
      label: category ? category.title : "Loading...",
      link: categoryId ? `/categories/${categoryId}` : "#",
    },
    //Динамическая ссылка, которая будет вести на конкретную категорию
    // },
  ];
  return (
    <div className="category">
      <div className="container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h2 className="container__title">{category?.title}</h2>
        <Filtration disabledDiscount={false} />

        <div className="container__items">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
