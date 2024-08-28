import React  from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCard/ProductCard';
import Filtration from '@/components/Filtration/Filtration';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {

  const { favourite, loading } = useSelector(state => state.products);

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
          <Link to={`/favourites`}>
            <button className="content__btn-2">Liked products</button>
          </Link>
        </div>
        <h2 className="content__page-title">Liked products</h2>

        <Filtration disabledDiscount={false} />

        <div className="content__list">
          {
            favourite && favourite.map((product, id) =>
              <ProductCard key={id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage