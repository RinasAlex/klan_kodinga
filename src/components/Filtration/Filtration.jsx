import React, { useEffect, useState } from 'react';
import './Filtration.scss';
import { useDispatch } from 'react-redux';
import { filterByPrice, filterSaleProducts, sortBy } from '../../store/futures/productSlice';
import { categoriesFilterByPrice, categoriesSortBy } from '../../store/futures/categoriesSlice';

const Filtration = ({ disabledDiscount, categoriesFilter, allProductsFilter }) => {
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortByValue, setSortByValue] = useState("default");

  useEffect(() => {
    if (!categoriesFilter) {
      if (minPrice !== '' && maxPrice !== '') {
        dispatch(categoriesFilterByPrice({ minPrice: Number(minPrice), maxPrice: Number(maxPrice) }));
      }
      dispatch(categoriesSortBy({ value: sortByValue }));
    } else if (!allProductsFilter) {
      if (minPrice !== '' && maxPrice !== '') {
        dispatch(filterByPrice({ minPrice: Number(minPrice), maxPrice: Number(maxPrice) }));
      }
      dispatch(sortBy({ value: sortByValue }));
    
    }

  }, [sortByValue, minPrice, maxPrice]);

  return (
    <div className='filters'>
      <div className="filters__price">
        <label htmlFor="">Price</label>
        <input
          type="number"
          className='form-control'
          name='minPrice'
          placeholder='from'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          className='form-control'
          name='maxPrice'
          placeholder='to'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {
        !disabledDiscount && (
          <div className="filters__discount">
            <label htmlFor="">Discounted items</label>

            <input
              type="checkbox"
              className='form-control-disc'
              name='discount'
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(filterSaleProducts());
                }
              }}
            />
          </div>
        )
      }


      <div className="filters__sort">
        <label htmlFor="">Sorted</label>
        <select
          name="sortSelect"
          className='form-control-sort'
          value={sortByValue}
          onChange={(e) => setSortByValue(e.target.value)}
        >
          <option value="default">by default</option>
          <option value="price-low-high">Price: Low-High</option>
          <option value="price-high-low">Price: High-Low</option>
        </select>
      </div>
    </div>
  )
}

export default Filtration;
