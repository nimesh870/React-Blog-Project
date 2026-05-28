import React , { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideToast } from './features/toastSlice'

const Toast = ({ message , type = 'success' , duration = 4000 }) => {

    const dispatch = useDispatch();

    // hides toast after duration completion
    useEffect( () => {
        const timer = setTimeout( () => dispatch(hideToast()) , duration )
        return () => clearTimeout(timer)
    },[])

    const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
    const icon = type === 'success' ? '✅' : '❌';

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${bgColor} text-white px-6 py-3
    rounded-xl shadow-lg flex items-center gap-3 animate-fade-in`}>
      <span className='text-xl font-bold'>{icon}</span>
      <p className='text-sm font-medium'>{message}</p>
    </div>
  )
}

export default Toast