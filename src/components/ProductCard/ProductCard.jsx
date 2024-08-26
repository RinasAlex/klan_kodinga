<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import './ProductCard.scss'
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { useDispatch, useSelector } from 'react-redux';
import { setFavourite } from '../../store/futures/productSlice';

const ProductCard = ({ product: { image, id, title, price, discont_price } }) => {
  const dispatch = useDispatch();
  const { product, favourite } = useSelector(state => state.products);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    let favouriteFound = favourite.find(item => item === product?.id);

    if (favouriteFound) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
  }, [favourite, product])



  const discountPercentage = Math.round(((price - discont_price) / price) * 100);
=======
import React from "react";
import "./ProductCard.scss";
import { Link, NavLink } from "react-router-dom";
import bag from "@/assets/image/bag.png";
import heart from "@/assets/image/heart.png";

const ProductCard = ({
  product: { image, id, title, price, discont_price },
}) => {
  const discountPercentage = Math.round(
    ((price - discont_price) / price) * 100
  );
>>>>>>> development

  return (
    <div className="productCard">
      <div className="productCard__top">
        <NavLink to={`/productPage/${id}`} state={{ id: id, title: title }}>
          <img src={`https://exam-server-5c4e.onrender.com/${image}`} alt="" />
        </NavLink>
        <div className="productCard__top-container">
          {discont_price && discont_price < price && (
            <p className="productCard__top-sale">-{discountPercentage}%</p>
          )}

          <div className="productCard__top-icon">
<<<<<<< HEAD
            <IoIosHeartEmpty className={`productCard__top-icon-heart ${isFavourite ? "productCard__top-favourite-active" : ""}`} onClick={() => dispatch(setFavourite(id))} />
            <HiOutlineShoppingBag className='productCard__top-icon-bag' />
=======
            <img src={heart} alt="" className="productCard__top-icon-heart" />
            <img src={bag} alt="" className="productCard__top-icon-bag" />
>>>>>>> development
          </div>
        </div>
      </div>

      <div className="productCard__bottom">
        <h3 className="productCard__bottom-title">
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>

        <div className="productCard__bottom-price-container">
          {discont_price && discont_price < price ? (
            <>
              <span className="productCard__bottom-discont_price">
                ${discont_price}
              </span>

              <span className="productCard__bottom-price1">${price}</span>
            </>
          ) : (
            <span className="productCard__bottom-price2">${price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
