import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ProductCard from "@/components/ProductCard/ProductCard";
import Filtration from "@/components/Filtration/Filtration";
import { Link } from "react-router-dom";
import {
  filterByPriceFavourite,
  filterSaleProductsFavourite,
  sortByFavourite,
} from "@/store/futures/productSlice";
import { ThemeContext } from "@/components/ThemeProvider/ThemeProvider";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const FavoritesPage = () => {
  const { theme } = useContext(ThemeContext);
  const { favourite, loading, filteredProductsFavourite } = useSelector(state => state.products);

  if (loading) {
    return "Loading ...."
  }
  const breadcrumbs = [
    {
      label: "Main page",
      link: "/",
    },
    {
      label: "Liked products",
      link: "/favourites",
    },
  ];
  const data =
    filteredProductsFavourite.length > 0
      ? filteredProductsFavourite
      : favourite;

  console.log(data);
  return (
    <div className="categories">
      <div className="content">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      
        <h2
          className={`content__page-title ${
            theme === "dark" ? "dark-text" : ""
          }`}
        >
          Liked products
        </h2>

        <Filtration
          filterSale={filterSaleProductsFavourite}
          filterByPrice={filterByPriceFavourite}
          sortBy={sortByFavourite}
        />

        <div className="container__items">
          {data &&
            data.map((product, id) => (
              <ProductCard key={id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
