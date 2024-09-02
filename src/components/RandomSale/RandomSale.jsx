import React, { useEffect } from "react";
import "./RandomSale.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterSaleProductsForPage } from "@/store/futures/productSlice";
import ProductCard from "../ProductCard/ProductCard";
import SmallButton from "../Button/SmallButton/SmallButton";

const RandomSale = () => {
  const dispatch = useDispatch();
  const { filteredProducts, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(filterSaleProductsForPage());
  }, [products]);

  const getRandomProducts = (filteredProducts, count) => {
    return filteredProducts && filteredProducts.length > 0
      ? [...filteredProducts].sort(() => 0.5 - Math.random()).slice(0, count)
      : [];
  };

  const productsRandom = getRandomProducts(filteredProducts, 4);

  return (
    <div className="sale">
      <div className="container">
        
        <div className="container__item">
        <SmallButton
            path="/sales"
            title="Sale"
            children={"All sales"}
          />
        </div>

        <div className="container__items">
          {productsRandom &&
            productsRandom.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <div className="container__btn-2-position">
          <Link to={`/sales`}>
            <button className="container__btn-2">All sales</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomSale;
