import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryCard from "@/components/Categories/CategoryCard";
import "./AllCategories.scss";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default function CategoriesPage() {
  const categoriesState = useSelector(
    //извлекаем данные из состояния хранилища
    (state) => state.categories.categoriesData
  );
  const status = useSelector((state) => state.categories.status === "loading");
  const breadcrumbs = [
    {
      label: "Main page",
      link: "/",
    },
    {
      label: "Categories",
      link: "/categories",
    },
  ];
  return (
    <div className="categories">
      <div className="content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
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
