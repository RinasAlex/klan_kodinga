import React from 'react'
import './ProductCard.scss'
import { Link } from 'react-router-dom';
import bag from '@/assets/headerImages/cart.svg';
import heart from '@/assets/headerImages/heard.svg'

const ProductCard = ({ product: {image, id, title, price, discont_price} }) => {

  const discountPercentage = Math.round(((price - discont_price) / price) * 100);

  return (
    <div className='productCard'>

      <div className="productCard__top">
        <Link to={`/products/${id}`}>
          <img src={`https://exam-server-5c4e.onrender.com/${image}`} alt="" />
        </Link>
        <div className="productCard__top-container">

          {discont_price && discont_price < price && (
            <p className="productCard__sale">
              -{discountPercentage}%
            </p>
          )}

          <div className="productCard__top-icon">
            <img src={heart} alt="" className='productCard__top-icon-heart' />
            <img src={bag} alt="" className='productCard__top-icon-bag' />
          </div>
        </div>
      </div>

      <div className="productCard__bottom">
        <h3 className="productCard__title"><Link to={`/products/${id}`}>{title}</Link></h3>

        <div className="productCard__price-container">
          {discont_price && discont_price < price ? (
            <>
              <span className='productCard__price'>{price}$</span>
              <span className='productCard__discont_price'>{discont_price}$</span>
            </>
          ) : (
            <span className='productCard__price'>{price}$</span>
          )}
        </div>

      </div>

    </div >
  )
}

export default ProductCard