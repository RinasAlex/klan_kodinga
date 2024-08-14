import React from 'react'
import './ProductCard.scss'
import { Link } from 'react-router-dom';

const ProductCard = () => {
  return (
    <div className='productCard'>
      <div className="productCard__top">
        <img src="{product.image}" alt="{product.title}" className='productCard__image'/>
      </div>
      <div className="productCard__bottom">
        <h3 className="productCard__title"><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
      <p className='productCard__price'><span>{product.price}$</span></p>

    </div>

    </div >
  )
}

export default ProductCard