import React, { useEffect } from 'react'
import './AllSalesPage.scss'
import ProductCard from '@/components/ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Filtration from '@/components/Filtration/Filtration';
import { filterByPriceSale, sortBySale, filterSaleProductsForPage } from '@/store/futures/productSlice';

const AllSalesPage = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(filterSaleProductsForPage());
  }, [products, dispatch]);

  if (loading) {
    return "Loading ...."
  }

  return (
    <div className="categories">
      <div className="content">
        <div className="content__position-btn">
          <Link to={`/`}>
            <button className="content__btn-1">Main page</button>
          </Link>
          <div className="content__line-position"></div>
          <Link to={`/sales`}>
            <button className="content__btn-2">All sales</button>
          </Link>
        </div>
        <h2 className="content__page-title">Discounted items</h2>

        <Filtration
          disabledDiscount={false}
          filterByPrice={filterByPriceSale}
          sortBy={sortBySale}
        />

        <div className="content__list">
          {
            filteredProducts && filteredProducts.map((product) =>
              <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
}

export default AllSalesPage

