import React from 'react'
import './PageNotFound.scss'
import four from '@/assets/image/four.png'
import zero from '@/assets/image/zero.png'
import { Link } from 'react-router-dom'

export default function PageNotFound() {

  return (

    <div className="PageNotFound">
      <div className="container">
        <div className="container__img">
          <img className='four' src={four} alt="4" />
          <img className='zero' src={zero} alt="0" />
          <img className='four' src={four} alt="4" />
        </div>
        <div className="content">
          <h1 className='content__errorTitle'>Page Not Found</h1>
          <p className='content__errorText'>
            We’re sorry, the page you requested could not be found.
            Please go back to the homepage.</p>
          <Link to={`/`}>
            <button className='content__errorBtn'>Go Home</button>
          </Link>

        </div>
      </div>
    </div>
  )
}
