import React, { useEffect, useState } from 'react'
import './ProductCard.scss'
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteFromLocalStorage, setFavourite } from '../../store/futures/productSlice';

const ProductCard = ({ product: { image, id, title, price, discont_price } }) => {
  const dispatch = useDispatch();

  const { product, favourite } = useSelector(state => state.products);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    let favouriteFound = favourite.find(item => item.id === id);
    // let favouriteFound = favourite.find(item => item === product?.id);

    if (favouriteFound) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
  }, [favourite, product])

  const discountPercentage = Math.round(((price - discont_price) / price) * 100);

  console.log(image, product)

  return (
    <div className="productCard">
      <div className="productCard__top">
        {/* <Link to={`/productPage/${id}`}> */}
        <Link to={`/productPage/${id}`} state={{ id: id, title: title }}>

          <img src={`https://exam-server-5c4e.onrender.com/${image}`} alt="" />
        </Link>
        <div className="productCard__top-container">
          {discont_price && discont_price < price && (
            <p className="productCard__top-sale">-{discountPercentage}%</p>
          )}

          <div className="actions">

            {/* {
              isFavourite ? (
                <IoHeartSharp
                  className={'actions__favourite actions__favourite-active'}
                 onClick={() => dispatch(setFavourite(id))}
                 style={{stroke: "black", strokeWidth:"24"}}
                />
              ) : (
                  <IoHeartOutline
                    className={`actions__favourite`}
                    onClick={() => dispatch(setFavourite(id))}
                    style={{stroke: "black", strokeWidth:"5"}}
                  />
              )
            } */}

            <IoHeartSharp
              className={`actions__favourite ${isFavourite ? "actions__favourite-active": ""}`}
              onClick={() => dispatch(setFavourite(id))}
              style={{ stroke: "black", strokeWidth: "24" }}
            />
            <HiOutlineShoppingBag className='actions__cart'
            
            />

          </div>
        </div>
      </div>

      <div className="productCard__bottom">
        <h3 className="productCard__bottom-title">
          {/* <Link to={`/productPage/${id}`} >{title}</Link> */}
          <Link to={`/productPage/${id}`} state={{ id: id, title: title }}>{title}</Link>
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
      </div >
    </div >
  );
};

export default ProductCard;