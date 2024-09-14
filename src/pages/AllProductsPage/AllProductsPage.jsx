import React from 'react'
import './AllProductsPage.scss'
import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard/ProductCard';
import Filtration from '@/components/Filtration/Filtration';
import {filterSaleProducts, filterByPriceAllProducts, sortByAllProducts } from '@/store/futures/productSlice';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const AllProductsPage = () => {
  const { filteredAllProducts, loading, products } = useSelector(state => state.products);
  
  if (loading) {
    return "Loading ...."
  }

  const data = filteredAllProducts.length > 0 ? filteredAllProducts : products;
  const breadcrumbs = [
    {
      label: "Main page",
      link: "/",
    },
    {
      label: "All products",
      link: "/products",
    },
  ];
  return (
    <div className="allProducts">
      <div className="container">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="filterForm"></div>
        <h2 className='container__title'>All products</h2>
        <Filtration
          filterSale={filterSaleProducts}
          filterByPrice={filterByPriceAllProducts}
          sortBy={sortByAllProducts} />

        <div className="container__list">
          {
            data && data.map((product) =>
              <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>


    </div>


  )
}

export default AllProductsPage