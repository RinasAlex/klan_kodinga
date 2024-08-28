import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard/ProductCard';
import Filtration from '@/components/Filtration/Filtration';
import { Link } from 'react-router-dom';
import { filterByPriceFavourite, filterSaleProductsFavourite, sortByFavourite } from '@/store/futures/productSlice';

const FavoritesPage = () => {

  const { favourite, loading, filteredProducts } = useSelector(state => state.products);

  if (loading) {
    return "Loading ...."
  }

  const data = filteredProducts.length > 0 ? filteredProducts : favourite;

  return (
    <div className="categories">
      <div className="content">
        <div className="content__position-btn">
          <Link to={`/`}>
            <button className="content__btn-1">Main page</button>
          </Link>
          <div className="content__line-position"></div>
          <Link to={`/favourites`}>
            <button className="content__btn-2">Liked products</button>
          </Link>
        </div>
        <h2 className="content__page-title">Liked products</h2>

        <Filtration
          filterSale={filterSaleProductsFavourite}
          filterByPrice={filterByPriceFavourite}
          sortBy={sortByFavourite}
        />

        <div className="content__list">
          {
            data && data.map((product, id) =>
              <ProductCard key={id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage