import React from 'react'
import './Banner.scss'
import banner from '@/assets/headerImages/banner.svg'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <header className='banner'>
      <div className="container">
        <div className="content">
          <img src={banner} alt="" className='banner__image' />
          <div className="banner__content">
            <h1 className='title'>Amazing Discounts <span>on Garden Products!</span></h1>
            <Link to={'/sales'}>
              <Button className='btn-default-size'>Check out</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Banner