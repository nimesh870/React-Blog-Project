import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite_services/authentication'
import { logout } from '../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then( () => dispatch(logout) )
    }
  return (
    <button
    onClick={handleLogout}
     className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn