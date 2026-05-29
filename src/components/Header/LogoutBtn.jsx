import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite_services/authentication'
import { logout } from '../../features/authSlice'
import { showToast } from '../../features/toastSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then( () => {
          dispatch(logout())

          dispatch(showToast({
            message: "Logged Out Successfully!",
            type : 'success'
          }))
        }
       )
    }
  return (
    <button type='button'
    onClick={handleLogout}
     className='inline-flex px-4 py-2 text-md font-medium
      text-red-500 hover:text-red-600
      hover:bg-red-50 transition-all duration-200
       rounded-xl'>Logout</button>
  )
}

export default LogoutBtn