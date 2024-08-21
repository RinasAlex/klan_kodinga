import React, { useEffect } from "react";
import './RandomSale.scss'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterSaleProducts } from "../../store/futures/productSlice";
import ProductCard from "../ProductCard/ProductCard";


const RandomSale = () => {
  const dispatch = useDispatch();
  const { filteredProducts, products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(filterSaleProducts());
  }, [products]);

  const getRandomProducts = (filteredProducts, count) => {
    return filteredProducts && filteredProducts.length > 0 ? [...filteredProducts].sort(() => 0.5 - Math.random()).slice(0, count) : [];
  }

  const productsRandom = getRandomProducts(filteredProducts, 4);

  console.log(filteredProducts);
  
  return (
    <div className="sale">
      <div className="container">
        <div className="container__item">
          <h2 className="container__title">Sale</h2>
          <div className="container__line"></div>
          <Link to={"/sales"}>
            <button className="container__btn">All sales</button>
          </Link>
        </div>

        <div className="container__list">
          {
            productsRandom && productsRandom.map(product => <ProductCard key={product.id} product={product} />)
          }
        </div>
        <div className="container__btn-2-position">
          <Link to={`/sales`}>
            <button className="container__btn-2">All sales</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RandomSale