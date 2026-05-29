import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-indigo-600',
    textColor = 'text-white',
    className = '',
    ...props

}) => {
  return (
    <button type={type} className={`px-6 py-2.5 font-semibold tracking-wide
       transition-all duration-200
       rounded-xl hover:opacity-90 hover:shadow-lg active:scale-95 
       disabled:opacity-50 disabled:cursor-not-allowed
       ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button