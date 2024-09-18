import React, { useContext, useEffect, useState } from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct, setFavourite } from "@/store/futures/productSlice";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

const ProductCard = ({
  product: { image, id, title, price, discont_price, count }, isCartHidden
}) => {
  const dispatch = useDispatch();

  const { product, favourite, cart } = useSelector((state) => state.products);
  const { theme } = useContext(ThemeContext);

  const [isFavourite, setIsFavourite] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [productInCart, setProductInCart] = useState({});

  useEffect(() => {
    let favouriteFound = favourite.find((item) => item.id === id);
    let cartFound = cart.find((item) => item.id === id);

    if (favouriteFound) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }

    if (cartFound) {
      setIsCart(true);
    } else {
      setIsCart(false);
    }
  }, [favourite, product, cart]);

  const discountPercentage = Math.round(
    ((price - discont_price) / price) * 100
  );

  const addToCart = (item) => {
    setProductInCart((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));
    !productInCart[item.id]
      ? dispatch(addProduct(item))
      : dispatch(removeProduct(item));
  };

  return (
    <div className="productCard">
      <div className="productCard__top">
        <Link to={`/productPage/${id}`}>
          <img src={`https://exam-server-5c4e.onrender.com/${image}`} alt="" />
        </Link>
        <div className="productCard__top-container">
          {discont_price && discont_price < price && (
            <p className="productCard__top-sale">-{discountPercentage}%</p>
          )}

          <div className="actions">

            <IoHeartSharp
              className={`actions__favourite ${isFavourite ? "actions__favourite-active" : ""}`}
              onClick={() => dispatch(setFavourite(id))}
              style={{ stroke: "black", strokeWidth: "24" }}
            />
            
            {!isCartHidden && <HiOutlineShoppingBag
              className={`actions__cart ${isCart ? "actions__cart-active" : ""}`}
              onClick={() =>
                addToCart({ image, id, title, price, discont_price, count })}
            />}
          </div>
        </div>
      </div>

      <div className={`productCard__bottom ${theme === "dark" ? "bg-dark_darker" : "bg-light"}`}>
        <h3 className="productCard__bottom-title">
          <Link className={`productCard__bottom-title ${theme === "dark" ? "dark-text" : ""}`} to={`/productPage/${id}`}>{title}</Link>
        </h3>

        <div className="productCard__bottom-price-container">
          {discont_price && discont_price < price ? (
            <>
              <span className={`productCard__bottom-discont_price ${theme === "dark" ? "dark-text" : ""}`}>
                ${discont_price}
              </span>

              <span className="productCard__bottom-price1">${price}</span>
            </>
          ) : (
            <span className={`productCard__bottom-price2 ${theme === "dark" ? "dark-text" : ""}`}>${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
