import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteFromLocalStorage } from '../../store/futures/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Filtration from '../../components/Filtration/Filtration';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  // const dispatch = useDispatch();
  const { favourite, loading } = useSelector(state => state.products);

  // useEffect(() => {
  //   dispatch(getFavouriteFromLocalStorage()); 
  //   },[]);

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
        <Filtration />
        <div className="content__list">
          {
            favourite && favourite.map((product) =>
              <ProductCard key={product.id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage