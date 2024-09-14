import React, { useContext, useEffect, useState } from 'react';
import './Filtration.scss';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';


const Filtration = ({ filterByPrice, sortBy, filterSale }) => {
  const dispatch = useDispatch();

  const {theme, setTheme} = useContext(ThemeContext);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortByValue, setSortByValue] = useState("default");

  useEffect(() => {
    let minPriceValue = (minPrice !== '' || minPrice > 0) ? minPrice : 0
    let maxPriceValue = (maxPrice !== '' || maxPrice > 0) ? maxPrice : Infinity

    dispatch(filterByPrice({ minPrice: Number(minPriceValue), maxPrice: Number(maxPriceValue) }))
    dispatch(sortBy({ value: sortByValue }))
  }, [sortByValue, minPrice, maxPrice, dispatch]);
 
  return (
    <div className='filters'>
      <div className="filters__price">
        <label htmlFor="" className={`${theme === "dark" ? "dark-text" : ""}`}>Price</label>
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
        typeof filterSale === 'function' && (
          <div className="filters__discount">
            <label htmlFor=""  className={`${theme === "dark" ? "dark-text" : ""}`}>Discounted items</label>

            <input
              type="checkbox"
              className='form-control-disc'
              name='discount'
              onChange={(e) => {
                dispatch(filterSale({ value: e.target.checked }));
              }}
            />
          </div>
        )
      }


      <div className="filters__sort">
        <label htmlFor=""  className={`${theme === "dark" ? "dark-text" : ""}`}>Sorted</label>
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