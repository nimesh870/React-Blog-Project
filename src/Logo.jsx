import React from 'react'
import logoImg from '../src/assets/blog.svg'

const Logo = ({width = '50px'}) => {
  return (
    <div className='transition duration-300 hover:scale-105'>
      <img src={logoImg} alt="blog" width={width} />
    </div>
  )
}

export default Logo