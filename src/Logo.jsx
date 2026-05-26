import React from 'react'

const Logo = ({width = '50px'}) => {
  return (
    <div className='transition duration-300 hover:scale-105'>
      <img src="src\assets\blog.svg" alt="blog" />
    </div>
  )
}

export default Logo