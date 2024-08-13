import React from 'react'
import './Banner.scss'
import banner from '@/assets/headerImages/banner.svg'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <header className='banner'>
      <img src={banner} alt="" className='bannerimage' />
      <div className="bannercontent">
        <div>
          <h1 className='title'>Amazing Discounts <span />on Garden Products!</h1>
        </div>
        <Link to={'/sales'}>
          <Button className='btn-default-size'>Check out</Button>
        </Link>
      </div>
    </header>
  )
}

export default Banner