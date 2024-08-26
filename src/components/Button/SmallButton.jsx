import React from 'react'
import './SmallButton.scss'

const SmallButton = ({className, children, ...props}) => {
  return (
    <button className={`btn-small ${className}`} {...props}>
        {children}
    </button>
  )
}

export default SmallButton