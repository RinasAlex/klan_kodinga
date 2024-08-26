import React from 'react'
import './AllProductsPage.scss'
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';

const AllProductsPage = () => {


  const { products, loading } = useSelector(state => state.products);
  if (loading) {
    return "Loading ...."
  }

  return (
    <div className="allProducts">
      <div className="container">
        <div className="filterForm"></div>
        <h2 className='container__title'>All products</h2>

        <div className="container__list">
          {
            products && products.map((product) =>
              <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>


    </div>


  )
}

export default AllProductsPage