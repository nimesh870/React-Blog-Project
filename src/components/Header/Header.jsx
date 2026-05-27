import React from 'react'
import {Container , Logo} from '../index'
import LogoutBtn from '../Header/LogoutBtn'
import { Link , useNavigate , useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import authService  from '../../appwrite_services/authentication'


const Header = ( {name} ) => {
  // reading the value of status from authSlice
  const authStatus = useSelector( (state) => state.auth.status )
  const user = useSelector( (state) => state.auth.userData )
  const navigate = useNavigate()
  const location = useLocation() // tracks current URL path to highlight the active nav item

  const navItems = [
    {
      name : "Home",
      slug : '/',
      active : true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 px-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center'>

          <div className='mr-8 flex items-center gap-2'> 
            <Link to = '/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='ml-auto flex items-center gap-1'>
            <div className='ml-auto mr-6 text-sm text-slate-600'>
              <p className='text-md text-slate-500'>Welcome back, {user?.name || "Guest"}</p>
            </div>

            {navItems.map( (item) =>  (
              item.active ? (
                <li key={item.name}>
                  <button className={`inline-block px-4 py-2
                    text-md font-medium rounded-xl transition-all
                     duration-200 ${location.pathname === item.slug 
                     ?'bg-indigo-50 text-indigo-600 font-semibold' :'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }`}
                      onClick={() => navigate(item.slug)}>{item.name}</button>
                </li>
              ) : null
            ))}

            {authStatus && (
              <li className='ml-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
