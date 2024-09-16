import React, { useContext, useEffect } from "react";
import "./AllSalesPage.scss";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Filtration from "@/components/Filtration/Filtration";
import { filterByPriceSale, sortBySale, filterSaleProductsForPage } from "@/store/futures/productSlice";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { ThemeContext } from '@/components/ThemeProvider/ThemeProvider';

const AllSalesPage = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, products } = useSelector(state => state.products);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(filterSaleProductsForPage());
  }, [products, dispatch]);

  if (loading) {
    return "Loading ....";
  }
  
  const breadcrumbs = [
    {
      label: "Main page",
      link: "/",
    },
    {
      label: "All sales",
      link: "/sales",
    },
  ];

  return (
    <div className="categories">
      <div className="content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <h2 className={`content__page-title ${theme === "dark" ? "dark-text" : ""}`}>Discounted items</h2>

        <Filtration
          disabledDiscount={true}
          filterByPrice={filterByPriceSale}
          sortBy={sortBySale}
        />

        <div className="container__items">
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllSalesPage;
